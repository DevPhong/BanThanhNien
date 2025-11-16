import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import { UsersService } from 'src/users/users.service';
import { add } from 'date-fns';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from 'src/auth/dto/register.dto';
import { LoginRequestDto, LoginResponseDto } from 'src/auth/dto/login.dto';
import express from 'express';
import { BcryptService } from 'src/auth/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async register(user: RegisterRequestDto): Promise<RegisterResponseDto> {
    const existing = await this.usersService.findByEmail(user.email);
    if (existing) throw new BadRequestException('Email already in use');
    const createdUser = await this.usersService.createUser(user);
    return {
      message: 'ok',
      userId: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  async login(
    loginDto: LoginRequestDto,
    res: express.Response,
  ): Promise<LoginResponseDto> {
    const user = await this.validateUserByEmail(
      loginDto.email,
      loginDto.password,
    );
    if (!user) throw new Error('Invalid credentials');

    const accessToken = this.createAccessToken(user.id, user.email);

    const session = await this.createSession(user.id, !!loginDto.remember);

    res.cookie('refreshToken', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge:
        (loginDto.remember
          ? Number(process.env.REFRESH_EXPIRES_DAYS_REMEMBER || 30)
          : Number(process.env.REFRESH_EXPIRES_DAYS || 7)) *
        24 *
        60 *
        60 *
        1000,
    });

    return { accessToken };
  }

  createAccessToken(userId: number, email: string): string {
    const payload = { id: userId, email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: parseInt(process.env.JWT_EXPIRES as string) || 86400, // 1 day
    });
  }

  async validateUserByEmail(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const ok = await this.bcryptService.compare(password, user.password);
    if (!ok) return null;
    return user;
  }

  // create refresh token and store in Session table
  async createSession(userId: number, remember = false) {
    const token = uuidv4();
    // expires: 30days default or 365d if remember
    const ttl = remember
      ? process.env.REFRESH_EXPIRES_DAYS_REMEMBER
        ? Number(process.env.REFRESH_EXPIRES_DAYS_REMEMBER)
        : 365
      : process.env.REFRESH_EXPIRES_DAYS
        ? Number(process.env.REFRESH_EXPIRES_DAYS)
        : 30;
    const expiresAt = add(new Date(), { days: ttl });
    const session = await this.prisma.session.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
    return session;
  }

  async revokeSession(token: string) {
    return this.prisma.session.deleteMany({ where: { token } });
  }

  async refreshAccessToken(
    refreshToken: string,
    slide = true,
    res: express.Response,
  ): Promise<{ accessToken: string; user: any }> {
    const session = await this.prisma.session.findUnique({
      where: { token: refreshToken },
    });
    if (!session) throw new UnauthorizedException('Invalid session');
    if (new Date(session.expiresAt) < new Date()) {
      await this.prisma.session.delete({ where: { id: session.id } });
      throw new UnauthorizedException('Session expired');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: session.userId },
    });
    if (!user) throw new UnauthorizedException('User not found');

    if (slide) {
      const ttl = Number(process.env.REFRESH_EXPIRES_DAYS || 30);
      const newExpires = add(new Date(), { days: ttl });
      await this.prisma.session.update({
        where: { id: session.id },
        data: { expiresAt: newExpires },
      });
    }

    // extend cookie if sliding and want to reset cookie lifetime
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });

    const accessToken = this.createAccessToken(user.id, user.email);
    return { accessToken, user };
  }

  async createPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    const token = uuidv4();
    const expiresAt = add(new Date(), { hours: 1 });
    const reset = await this.prisma.passwordReset.create({
      data: { userId: user.id, token, expiresAt },
    });
    return reset;
  }

  async usePasswordReset(token: string, newPassword: string) {
    const reset = await this.prisma.passwordReset.findUnique({
      where: { token },
    });
    if (!reset) throw new UnauthorizedException('Invalid token');
    if (reset.used) throw new UnauthorizedException('Token used');
    if (new Date(reset.expiresAt) < new Date())
      throw new UnauthorizedException('Expired token');

    await this.usersService.updatePassword(+reset.userId, newPassword);
    await this.prisma.passwordReset.update({
      where: { id: reset.id },
      data: { used: true },
    });
    // optionally revoke all sessions for user
    await this.prisma.session.deleteMany({ where: { userId: reset.userId } });
    return true;
  }
}

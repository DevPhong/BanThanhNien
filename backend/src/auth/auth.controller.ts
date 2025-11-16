import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto, LoginResponseDto } from 'src/auth/dto/login.dto';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from 'src/auth/dto/register.dto';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import express from 'express';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { ResetRequestDto } from 'src/auth/dto/reset.dto';
import { ForgotDto } from 'src/auth/dto/forgot.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDto | BadRequestException> {
    return await this.authService.register(registerBody);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
    @Body() dtoLogin: LoginRequestDto,
  ): Promise<LoginResponseDto | BadRequestException> {
    return await this.authService.login(dtoLogin, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const token = req.cookies?.refreshToken || req.headers['x-refresh-token'];
    if (token) {
      await this.authService.revokeSession(token as string);
    }
    res.clearCookie('refreshToken', { path: '/' });
    return { message: 'Logged out' };
  }

  @Post('forgot')
  async forgot(@Body() dto: ForgotDto) {
    const reset = await this.authService.createPasswordReset(dto.email);
    return { message: 'ok', resetToken: reset.token };
  }

  @Post('reset')
  async reset(@Body() resetDto: ResetRequestDto) {
    await this.authService.usePasswordReset(
      resetDto.token,
      resetDto.newPassword,
    );
    return { message: 'Password updated' };
  }

  @Post('refresh')
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const token = req.cookies?.refreshToken || req.headers['x-refresh-token'];
    if (!token) throw new Error('No refresh token');

    const { accessToken, user } = await this.authService.refreshAccessToken(
      token,
      true,
      res,
    );
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: express.Request) {
    return req.user;
  }
}

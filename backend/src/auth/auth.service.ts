import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
// import { jwtConstants } from 'src/constants';
// import { v4 as uuidv4 } from 'uuid';
// import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { BcryptService } from 'src/auth/bcrypt.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import 'dotenv/config';
import { LoginEntity } from 'src/auth/entity/login.entity';
import { jwtConstants } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  /**
   * Đăng ký người dùng mới
   * @param registerDto
   */

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;
    const hashPassword = this.bcryptService.hash(password);

    const checkEmailExist = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (checkEmailExist) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.EMAIL_EXISTED,
      });
    }
    const registerUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: await hashPassword,
      },
    });

    const sessionToken = await this.jwtService.signAsync(
      {
        id: registerUser.id,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.sessionTokenExpiresIn, // 7 days
      },
    );

    const session = await this.prismaService.session.create({
      data: {
        userId: registerUser.id,
        token: sessionToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return { ...registerUser, token: session.token };
  }

  /**
   * Đăng nhập người dùng
   * @param loginDto
   * @returns LoginEntity
   */
  async login(loginDto: LoginDto): Promise<LoginEntity> {
    const { email, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.USER_NOT_FOUND,
      });
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.WRONG_CREDENTIALS,
      });
    }

    const sessionToken = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.sessionTokenExpiresIn, // 7 days
      },
    );

    const session = await this.prismaService.session.create({
      data: {
        userId: user.id,
        token: sessionToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return session;
  }

  /**
   * Tăng thời gian hết hạn của session token lên
   * @param sessionToken
   */
  async slideSession(sessionToken: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await this.prismaService.session.update({
      where: {
        token: sessionToken,
      },
      data: {
        expiresAt,
      },
    });
    return session;
  }

  /**
   * Đăng xuất người dùng
   * @param sessionToken
   */

  async logout(sessionToken: string) {
    await this.prismaService.session.delete({
      where: {
        token: sessionToken,
      },
    });
    return { message: 'Đăng xuất thành công' };
  }

  /**
   * Lấy thông tin người dùng hiện tại
   * @param req
   */

  async getMe(req: Request) {
    const userId = req['user']['userId'];
    const session = await this.prismaService.session.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    if (!session) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.NOT_ACCESS_TOKEN,
      });
    }
    const { ...userData } = session.user;
    return userData;
  }
}

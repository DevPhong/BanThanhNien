import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { AuthGuard } from 'src/guards/auth.guard';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { RegisterEntity } from 'src/auth/entity/register.entity';
import { LoginEntity } from 'src/auth/entity/login.entity';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signUp(@Body() registerDto: RegisterDto): Promise<RegisterEntity> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginEntity> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Post('slide-session')
  async slideSession(@Body() refreshToken: string) {
    return this.authService.slideSession(refreshToken);
  }

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    const sessionToken = req.headers['authorization']?.split(' ')[1];
    if (!sessionToken) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.NOT_ACCESS_TOKEN,
      });
    }
    return this.authService.logout(sessionToken as string);
  }

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: Request) {
    return this.authService.getMe(req);
  }
}

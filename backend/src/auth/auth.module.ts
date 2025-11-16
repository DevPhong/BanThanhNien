import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/jwt/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { LocalStrategy } from 'src/guards/local.strategy';
import { BcryptService } from 'src/auth/bcrypt.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRES as string) || 86400, // 1 day
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
    UsersService,
    PrismaService,
    BcryptService,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

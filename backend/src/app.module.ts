import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/exception-fillters/global-exception.filter';
import { ProfileModule } from './profile/profile.module';
import { JwtService } from '@nestjs/jwt';
import { ScoreModule } from './score/score.module';
import 'dotenv/config';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ProfileModule, ScoreModule],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/prisma.service';
import { ProfileController } from 'src/profile/profile.controller';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtStrategy } from 'src/guards/jwt/jwt.strategy';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/avatars', // Specify your upload directory
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    PrismaService,
    JwtStrategy,
    AuthGuard,
    JwtService,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}

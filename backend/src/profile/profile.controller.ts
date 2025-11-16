import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileService } from 'src/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Get(':id')
  getProfileById(@Param('id') id: number) {
    return this.profileService.getProfileById(+id);
  }

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Patch(':id/user')
  updateProfileByUserId(
    @Param('id') userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfileByUserId(userId, updateProfileDto);
  }

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid file type'), false);
        }
        // const maxSize = 5 * 1024 * 1024; // 5MB
        // if (file.size > maxSize) {
        //   cb(new BadRequestException('File too large'), false);
        // } else {
        //   cb(null, true);
        // }
      },
    }),
  )
  uploadFileProfileByUserId(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.profileService.handleFileUpload(file, req);
  }
}

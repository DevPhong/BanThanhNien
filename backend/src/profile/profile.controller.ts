import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileEntity } from 'src/profile/entity/profie.entity';
import { ProfileService } from 'src/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Get(':id')
  getProfileById(@Param('id') id: number): Promise<ProfileEntity> {
    return this.profileService.getProfileById(+id);
  }

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Post('upload-avatar')
  @UseGuards(AuthGuard, JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(file: Express.Multer.File, @Req() req: Request) {
    Logger.log('Received file upload request', file);
    return this.profileService.handleFileUpload(file, req);
  }

  @UseGuards(AuthGuard, JwtAuthGuard)
  @Patch(':id/user')
  updateProfileByUserId(
    @Param('id') userId: number,
    @Req() req: Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profileService.updateProfileByUserId(
      userId,
      req,
      updateProfileDto,
    );
  }
}

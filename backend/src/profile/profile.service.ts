import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { PrismaService } from 'src/prisma.service';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import dayjs from 'dayjs';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfileById(id: number) {
    if (!id) throw new BadRequestException('ID not found');
    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: id,
      },
    });

    if (!profile) throw new BadRequestException('Profile not found');

    return profile;
  }

  async handleFileUpload(file: Express.Multer.File, req: Request) {
    const userId = +req['user']['id'];

    if (!file) throw new BadRequestException('File not found');

    await this.prismaService.profile.update({
      where: { userId },
      data: { avatarUrl: file.path },
    });

    return { message: 'Updated avatar successfully', filePath: file.path };
  }

  async updateProfileByUserId(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ) {
    const existProfile = await this.prismaService.profile.findUnique({
      where: { id: +userId },
    });

    if (!existProfile) {
      throw new BadRequestException('Profile not found');
    }

    const updatedProfile = await this.prismaService.profile.update({
      where: { id: +userId },
      data: {
        ...updateProfileDto,
        dateOfBirth: dayjs(updateProfileDto.dateOfBirth).add(1, 'day').toDate(),
      },
    });

    return updatedProfile;
  }
}

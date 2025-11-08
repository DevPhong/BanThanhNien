import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Role } from 'src/common/enum/role.enum';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { PrismaService } from 'src/prisma.service';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileEntity } from 'src/profile/entity/profie.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfileById(id: number): Promise<ProfileEntity> {
    if (!id) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.ID_NOT_FOUND,
      });
    }
    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: id,
      },
    });

    if (!profile) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.PROFILE_NOT_FOUND,
      });
    }
    return profile as ProfileEntity;
  }

  async handleFileUpload(file: Express.Multer.File, req: Request) {
    Logger.log('Handling file upload...', file);
    // Xóa file nếu file bị truncated
    const id = req['user']['userId'];
    if (!file) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.FILE_NOT_FOUND,
      });
    }

    // validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }

    // validate file size (e.g., max 5mb)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large!');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    const userRole = user?.role;

    // Only admin or the user themselves can update the avatar
    if (userRole === Role.ADMIN || id === user?.id) {
      await this.prismaService.profile.update({
        where: { userId: id },
        data: { avatarUrl: file.path },
      });
    }

    return { message: 'Cập nhật avatar thành công' };
  }

  // async getBirthdays(
  //   range: 'today' | 'week' | 'month',
  // ): Promise<{ name: string; dateOfBirth: string }[]> {
  //   const today = new Date();
  //   const start = new Date(today);
  //   const end = new Date(today);

  //   if (range === 'week') {
  //     start.setDate(today.getDate() - 3);
  //     end.setDate(today.getDate() + 3);
  //   } else if (range === 'month') {
  //     start.setMonth(today.getMonth());
  //     start.setDate(1);
  //     end.setMonth(today.getMonth() + 1);
  //     end.setDate(0);
  //   }

  //   const profiles = await this.prismaService.profile.findMany({
  //     where: {
  //       dateOfBirth: { not: undefined },
  //     },
  //     include: { user: true },
  //   });

  //   const filtered = profiles.filter((p) => {
  //     const dob = new Date(p.dateOfBirth);
  //     const birthdayThisYear = new Date(
  //       today.getFullYear(),
  //       dob.getMonth(),
  //       dob.getDate(),
  //     );
  //     return birthdayThisYear >= start && birthdayThisYear <= end;
  //   });

  //   const birthdays = filtered.map((profile: any) => ({
  //     name: profile.user.name,
  //     date: profile.dateOfBirth.toISOString().split('T')[0],
  //   }));
  //   return birthdays.map((p) => ({
  //     name: p.name,
  //     dateOfBirth: p.date,
  //   }));
  // }

  async updateProfileByUserId(
    userId: number,
    req: Request,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const requesterId = req['user']['userId']; // id admin hoặc chính user đó
    const requester = await this.prismaService.user.findUnique({
      where: { id: requesterId },
    });
    const requesterRole = requester?.role;
    const checkProfile = await this.prismaService.profile.findUnique({
      where: { userId: userId },
    });

    if (requesterRole === Role.ADMIN || requesterId === requester?.id) {
      if (checkProfile === null) {
        const createdProfile = await this.prismaService.profile.create({
          data: {
            ...updateProfileDto,
            userId: userId,
            dateOfBirth: new Date(updateProfileDto.dateOfBirth),
            joinDate: new Date(updateProfileDto.joinDate),
          },
        });
        return createdProfile as ProfileEntity;
      } else {
        const updatedProfile = await this.prismaService.profile.update({
          where: { userId: userId },
          data: {
            ...updateProfileDto,
            userId: userId,
            dateOfBirth: new Date(updateProfileDto.dateOfBirth),
            joinDate: new Date(updateProfileDto.joinDate),
          },
        });
        return updatedProfile as ProfileEntity;
      }
    } else {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.FORBIDDEN_UPDATE_PROFILE,
      });
    }
  }
}

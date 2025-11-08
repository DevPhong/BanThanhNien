import { BadRequestException, Injectable } from '@nestjs/common';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany({
      include: {
        profile: true,
      },
    });
    return users;
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    if (!id) {
      throw new BadRequestException({
        message: ERRORS_DICTIONARY.USER_NOT_FOUND,
      });
    }

    await this.prismaService.session.deleteMany({
      where: { userId: id },
    });

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
    return { message: 'Người dùng đã được xóa thành công' };
  }

  // async updateUserRole(id: number, role: Role): Promise<UserResponseDto> {
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!user) {
  //     throw new BadRequestException({
  //       message: ERRORS_DICTIONARY.USER_NOT_FOUND,
  //     });
  //   }
  //   const updatedRole = await this.prismaService.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       role,
  //     },
  //   });
  //   return updatedRole as UserResponseDto;
  // }
}

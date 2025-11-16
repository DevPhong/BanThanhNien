import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from 'src/auth/dto/register.dto';
import { BcryptService } from 'src/auth/bcrypt.service';
import { PrismaService } from 'src/prisma.service';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(registerUserDto: RegisterRequestDto) {
    const hash = await this.bcryptService.hash(registerUserDto.password);

    return this.prismaService.user.create({
      data: {
        ...registerUserDto,
        password: hash,
        profile: {
          create: {
            joinDate: dayjs().tz().toDate(),
            fullName: '',
            phone: '',
            address: '',
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async findById(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async updatePassword(userId: number, newPassword: string) {
    const hash = await this.bcryptService.hash(newPassword);
    return this.prismaService.user.update({
      where: { id: userId },
      data: { password: hash },
    });
  }

  async getListUsers() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}

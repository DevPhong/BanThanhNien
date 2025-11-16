import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  // @UseGuards(AuthGuard, JwtAuthGuard)
  // @Get('')
  // getListUsers() {
  //   return this.usersService.getListUsers();
  // }
}

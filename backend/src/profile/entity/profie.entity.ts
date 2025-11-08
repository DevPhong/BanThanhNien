import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  phone: string;

  @ApiProperty({ nullable: true })
  avatarUrl?: string;

  @ApiProperty({ nullable: true })
  joinDate?: Date;

  @ApiProperty()
  address: string;

  @ApiProperty({ nullable: true })
  note?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  MinLength,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Full name of the profile owner',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  readonly fullName: string;

  @ApiProperty({
    description: 'Date of birth of the profile owner',
    example: '12-05-1990',
    required: true,
  })
  @IsOptional()
  @IsString()
  readonly dateOfBirth: string;

  @ApiProperty({
    description: 'Phone number of the profile owner',
    example: '+1234567890',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  readonly phone: string;

  @ApiProperty({
    description: 'Avatar URL of the profile owner',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'avatarUrl must be a valid URL' })
  readonly avatarUrl?: string;

  @ApiProperty({
    description: 'Join date of the profile owner',
    example: '2020-01-01',
    required: false,
  })
  @IsOptional()
  readonly joinDate: string;

  @ApiProperty({
    description: 'Address of the profile owner',
    example: '123 Main St, Anytown, USA',
    required: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly address: string;

  @ApiProperty({
    description: 'Additional notes about the profile owner',
    example: 'This is a note about the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly note: string;
}

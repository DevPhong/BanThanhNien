import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @MaxLength(12)
  password: string;
}

export class RegisterResponseDto {
  message: string;
  userId: number;
  name: string;
  email: string;
}

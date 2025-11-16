import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(12)
  password: string;

  remember?: boolean;
}

export class LoginResponseDto {
  accessToken: string;
}

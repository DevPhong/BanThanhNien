import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ResetRequestDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @MaxLength(12)
  newPassword: string;
}

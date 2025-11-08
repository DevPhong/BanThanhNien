import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
  @ApiProperty() id: number;

  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  userId: number;
}

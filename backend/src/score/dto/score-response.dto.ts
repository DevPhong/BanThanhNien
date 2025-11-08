import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ScoreResponseDto {
  @ApiProperty({
    description: 'User ID associated with the score',
    example: 1,
  })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({
    description: 'Total score achieved',
    example: 95,
  })
  @IsNotEmpty()
  readonly totalScore: number;

  @ApiProperty({
    description: 'Optional comment about the score',
    example: 'Excellent performance',
    required: false,
  })
  readonly comment: string;

  @ApiProperty({
    description: 'Date when the score was recorded',
    example: '2024-06-15',
  })
  @IsNotEmpty()
  readonly scoreDate: Date;
}

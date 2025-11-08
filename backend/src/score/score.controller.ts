import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScoreDto } from 'src/score/dto/create-score.dto';
import { ScoreResponseDto } from 'src/score/dto/score-response.dto';
import { ScoreService } from 'src/score/score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('')
  createScore(
    @Body() createScoreDto: CreateScoreDto[],
  ): Promise<ScoreResponseDto[]> {
    return this.scoreService.createScore(createScoreDto);
  }

  @Get('/:date')
  getScoresByDate(@Param('date') date: string): Promise<ScoreResponseDto[]> {
    return this.scoreService.getScoresByDate(date);
  }

  @Get('/summary/month/:year-:month')
  getCurrentMonthScores(
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<ScoreResponseDto[]> {
    return this.scoreService.getCurrentMonthScores(year, month);
  }

  @Get('/summary/quarter/:year/:quarter')
  getCurrentQuarterScores(
    @Param('year') year: number,
    @Param('quarter') quarter: number,
  ): Promise<ScoreResponseDto[]> {
    return this.scoreService.getCurrentQuarterScores(year, quarter);
  }

  @Get('/summary/year/:year')
  getCurrentYearScores(
    @Param('year') year: number,
  ): Promise<ScoreResponseDto[]> {
    return this.scoreService.getCurrentYearScores(year);
  }
}

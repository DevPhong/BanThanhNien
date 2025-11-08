import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateScoreDto } from 'src/score/dto/create-score.dto';
import { ScoreResponseDto } from 'src/score/dto/score-response.dto';

@Injectable()
export class ScoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async createScore(
    createScoreDto: CreateScoreDto[],
  ): Promise<ScoreResponseDto[]> {
    const createdScores = [] as ScoreResponseDto[];
    for (const dto of createScoreDto) {
      const score = await this.prismaService.score.create({
        data: {
          userId: dto.userId,
          totalScore: dto.totalScore,
          scoreDate: new Date(dto.scoreDate),
        },
      });
      createdScores.push(score as ScoreResponseDto);
    }
    return createdScores;
  }

  async getScoresByDate(date: string): Promise<ScoreResponseDto[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return this.prismaService.score.findMany({
      where: {
        scoreDate: { gte: startOfDay, lt: endOfDay },
      },
    }) as Promise<ScoreResponseDto[]>;
  }

  async getCurrentMonthScores(year: number, month: number): Promise<any[]> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const scores = await this.prismaService.score.findMany({
      where: {
        scoreDate: { gte: startOfMonth, lt: endOfMonth },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    // Tổng hợp theo userId
    const summary: Record<number, { totalScore: number; name: string }> = {};
    for (const score of scores) {
      if (!summary[score.userId]) {
        summary[score.userId] = { totalScore: 0, name: score.user?.name || '' };
      }
      summary[score.userId].totalScore += score.totalScore;
    }

    // Chuyển về mảng kết quả
    return Object.entries(summary).map(([userId, { totalScore, name }]) => ({
      userId: Number(userId),
      name,
      totalScore,
    }));
  }

  async getCurrentYearScores(year: number): Promise<any[]> {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
    const scores = await this.prismaService.score.findMany({
      where: {
        scoreDate: { gte: startOfYear, lt: endOfYear },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
    // Tổng hợp theo userId
    const summary: Record<number, { totalScore: number; name: string }> = {};
    for (const score of scores) {
      if (!summary[score.userId]) {
        summary[score.userId] = { totalScore: 0, name: score.user?.name || '' };
      }
      summary[score.userId].totalScore += score.totalScore;
    }
    // Chuyển về mảng kết quả
    return Object.entries(summary).map(([userId, { totalScore, name }]) => ({
      userId: Number(userId),
      name,
      totalScore,
    }));
  }

  async getCurrentQuarterScores(year: number, quarter: number): Promise<any[]> {
    const startMonth = (quarter - 1) * 3;
    const startOfQuarter = new Date(year, startMonth, 1);
    const endOfQuarter = new Date(year, startMonth + 3, 0, 23, 59, 59, 999);
    const scores = await this.prismaService.score.findMany({
      where: {
        scoreDate: { gte: startOfQuarter, lt: endOfQuarter },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
    // Tổng hợp theo userId
    const summary: Record<number, { totalScore: number; name: string }> = {};
    for (const score of scores) {
      if (!summary[score.userId]) {
        summary[score.userId] = { totalScore: 0, name: score.user?.name || '' };
      }
      summary[score.userId].totalScore += score.totalScore;
    }
    // Chuyển về mảng kết quả
    return Object.entries(summary).map(([userId, { totalScore, name }]) => ({
      userId: Number(userId),
      name,
      totalScore,
    }));
  }
}

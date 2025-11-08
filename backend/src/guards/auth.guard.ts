import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // Kiểm tra và xác thực token JWT có hợp lệ không
  async canActivate(context: ExecutionContext): Promise<boolean> {
    Logger.log('AuthGuard: Checking authentication...');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    Logger.log(`AuthGuard: Extracted token: ${token}`);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      Logger.log('AuthGuard: User payload', payload);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

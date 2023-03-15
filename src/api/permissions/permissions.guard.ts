import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from './permissions.service';

@Injectable()
export class PermissonGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const user = this.jwtService.verify(token);
      const userId = user.id;

      const url = req.url;
      const boardId = Number(url.slice(8, req.url.length));

      const isAvailable = await this.permissionsService.checkPermisson(
        boardId,
        userId,
      );

      if (isAvailable.length != 0) {
        return true;
      } else {
        throw new HttpException(
          'You dont have enough rights',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (e) {
      throw new HttpException(
        'You dont have enough rights',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}

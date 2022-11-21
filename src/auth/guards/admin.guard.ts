import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException();
    }
    if (!request.user.isAdmin) {
      throw new ForbiddenException("your are not admin");
    }
    return request.user.isAdmin;
    // return request.currentUser.isAdmin;
  }
}

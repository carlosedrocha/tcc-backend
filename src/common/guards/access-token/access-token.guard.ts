import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Allow access if the route is marked as public
    }

    // Call the canActivate method of the parent class (AuthGuard('jwt'))
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Custom handling of authentication errors
    if (err || !user) {
      console.error('aa', err);
      throw err || new UnauthorizedException();
    }
    return user; // Return the validated user
  }
}

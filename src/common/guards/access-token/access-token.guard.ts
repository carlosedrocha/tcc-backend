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

    // Check if the request is from a WebSocket
    if (context.getType() === 'ws') {
      // Allow access without token or user validation
      return true; // Permit access to WebSocket
    }

    // Call the canActivate method of the parent class (AuthGuard('jwt'))
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    // Custom handling of authentication errors
    if (err || !user) {
      console.error('Authentication Error:', err);
      throw err || new UnauthorizedException();
    }
    // Attach user to the request object
    const req = context.switchToHttp().getRequest();
    req.user = user; // Attach the user info to the request
    return user; // This is added to req.user by Passport
  }
}

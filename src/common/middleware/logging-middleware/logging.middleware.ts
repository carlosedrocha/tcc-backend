import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getUserIdFromToken } from 'src/helper/jwt/get-user-id-from-token/get-user-id-from-token';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, path, body, baseUrl } = req;
    console.log(req.baseUrl);
    const authHeader = req.headers['authorization'] || null;
    let userId = null;

    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
      userId = getUserIdFromToken(token); // Call the helper function with the secret
      console.log(`userId`, userId); // Log the userId
    }

    // Log the request user object directly
    console.log(`req.user`, req.headers.authorization);

    const start = Date.now();

    // Capture original 'send' function
    const originalSend = res.send.bind(res);

    // Override 'send' function
    res.send = (...args: any[]): Response => {
      // Log asynchronously without awaiting it
      this.prisma.log
        .create({
          data: {
            path: baseUrl,
            method: method,
            userId: userId, // Log the userId her
            payload: body,
            status: res.statusCode,
          },
        })
        .catch((error) => {
          console.error('Error logging request:', error);
          // Optionally handle logging errors here
        });

      // Call the original 'send' function using rest parameters
      return originalSend(...args);
    };

    // Continue to the next middleware
    next();
  }
}

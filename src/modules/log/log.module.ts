// src/common/logging/logging.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from 'src/common/middleware/logging-middleware/logging.middleware';
import { PrismaModule } from 'src/modules/prisma/prisma.module'; // Ensure this import path is correct

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  providers: [LoggingMiddleware],
  exports: [LoggingMiddleware], // Export the middleware to use in other modules
})
export class LogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Apply to all routes or specify specific ones
  }
}

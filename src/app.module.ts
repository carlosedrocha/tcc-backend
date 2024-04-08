import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ItemModule } from './modules/item/item.module';
import { DishModule } from './modules/dish/dish.module';
import { CategoryModule } from './modules/category/category.module';


@Module({
  imports: [AuthModule, CategoryModule, DishModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { DishModule } from './modules/dish/dish.module';
import { ItemModule } from './modules/item/item.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ItemTypeModule } from './modules/item-type/item-type.module';
import { OrderModule } from './modules/order/order.module';
import { TabModule } from './modules/tab/tab.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    CategoryModule,
    ItemModule,
    DishModule,
    MenuModule,
    RoleModule,
    PermissionModule,
    ItemTypeModule,
    OrderModule,
    TabModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}

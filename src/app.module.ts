import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { DishModule } from './modules/dish/dish.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { ItemTypeModule } from './modules/item-type/item-type.module';
import { ItemModule } from './modules/item/item.module';
import { KanbanModule } from './modules/kanban/kanban.module';
import { LogModule } from './modules/log/log.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrderModule } from './modules/order/order.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RoleModule } from './modules/role/role.module';
import { StockMovementModule } from './modules/stock-movement/stock-movement.module';
import { StockModule } from './modules/stock/stock.module';
import { TabModule } from './modules/tab/tab.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UserModule } from './modules/user/user.module';

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
    FileUploadModule,
    EmployeeModule,
    StockModule,
    StockMovementModule,
    TransactionsModule,
    KanbanModule,
    LogModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}

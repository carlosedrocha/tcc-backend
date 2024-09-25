import { Module } from '@nestjs/common';
import { WaiterBellController } from './waiter-bell.controller';
import { WaiterBellService } from './waiter-bell.service';
import { WaiterBellGateway } from './waiter-bell.gateway';

@Module({
  controllers: [WaiterBellController],
  providers: [WaiterBellService,WaiterBellGateway]
})
export class WaiterBellModule {}

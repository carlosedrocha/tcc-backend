import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }
}

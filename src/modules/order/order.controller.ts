import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, dto);
  }
}

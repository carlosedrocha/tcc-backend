import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto, UpdateDishDto } from './dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDish(@Body() dto: CreateDishDto) {
    return this.dishService.createDish(dto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateDish(@Param('id') id: string, @Body() dto: UpdateDishDto) {
    return this.dishService.updateDish(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteDish(@Param('id') id: string) {
    return this.dishService.deleteDish(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDishes() {
    return this.dishService.getDishes();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getDishById(@Param('id') id: string) {
    return this.dishService.getDishById(id);
  }
}

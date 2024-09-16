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
import { CreateItemDto, UpdateItemDto } from './dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createItem(@Body() dto: CreateItemDto) {
    return this.itemService.createItem(dto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateItem(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemService.updateItem(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getItems() {
    return this.itemService.getItems();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getItemById(@Param('id') id: string) {
    return this.itemService.getItemById(id);
  }
}

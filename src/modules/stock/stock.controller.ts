import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getStocks() {
    return this.stockService.getStocks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getStockById(@Param('id') id: string) {
    return this.stockService.getStockById(id);
  }
}

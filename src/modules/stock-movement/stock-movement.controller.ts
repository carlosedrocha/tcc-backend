import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AddStockEntryDto } from './dto/stock-movement/add-stock-entry.dto';
import { StockMovementService } from './stock-movement.service';

@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly stockMovementService: StockMovementService) {}

  @Post('/entry/:stockId')
  @HttpCode(HttpStatus.CREATED)
  addStockEntry(
    @Param('stockId') stockId: string,
    @Body() dto: AddStockEntryDto,
  ) {
    return this.stockMovementService.addStockEntry(stockId, dto);
  }
}

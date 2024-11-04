import { MovementType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTransactionDto } from 'src/modules/transactions/dto';

export class AddStockEntryDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateTransactionDto)
  transaction?: CreateTransactionDto;

  @IsNotEmpty()
  @IsEnum(MovementType)
  movementType: MovementType;

  @IsOptional()
  @IsString()
  description?: string;
}

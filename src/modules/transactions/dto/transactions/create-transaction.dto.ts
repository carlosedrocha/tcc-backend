import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionStatus,
  TransactionType,
} from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(TransactionCategory)
  category: TransactionCategory;

  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsNotEmpty()
  @IsEnum(TransactionPaymentMethod)
  paymentMethod: TransactionPaymentMethod;

  @IsUUID()
  @IsOptional()
  tabId?: string;
}

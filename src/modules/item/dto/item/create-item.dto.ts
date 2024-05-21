import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  measurementUnit: string;

  @IsNotEmpty()
  @IsNumber()
  measurementUnitValue: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsOptional()
  @IsString()
  typeId?: string;
}

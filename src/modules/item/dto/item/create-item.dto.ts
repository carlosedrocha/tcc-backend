import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  measurementUnit?: string;

  @IsOptional()
  @IsNumber()
  measurementUnitValue?: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsString()
  typeId?: string;
}

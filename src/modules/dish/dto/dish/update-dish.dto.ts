import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDishDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsArray()
  categoriesIds?: string[];

  @IsOptional()
  @IsArray()
  itemsIds?: string[];
}

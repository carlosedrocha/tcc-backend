import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class Item {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateDishDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  recipe?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  //TODO validate this (if should or not be optional)!!
  @IsOptional()
  @IsArray()
  categoriesIds?: string[];

  @IsOptional()
  @IsArray()
  items?: Item[];
}

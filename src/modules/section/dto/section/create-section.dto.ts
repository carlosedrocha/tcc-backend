import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  menuIds?: string[]; // IDs dos menus associados

  @IsOptional()
  @IsArray()
  dishIds?: string[]; // IDs dos pratos associados

  @IsOptional()
  @IsArray()
  itemIds?: string[];
}

import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  name?: string;

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

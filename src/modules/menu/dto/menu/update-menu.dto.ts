import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class UpdateSectionDto {
  @IsOptional()
  @IsString()
  id?: string; // O ID é opcional para identificar seções existentes

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dishIds?: string[];
}

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  disabled?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSectionDto)
  sections?: UpdateSectionDto[];
}

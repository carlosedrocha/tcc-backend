import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString({ each: true }) // Valida se todos os elementos do array são strings
  sections?: string[];
}

import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
export class EntityDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;
}
export class CreateTabDto {
  @IsOptional()
  @IsNumber()
  tabNumber: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @ValidateNested()
  @Type(() => EntityDto)
  @IsOptional()
  entity: EntityDto;
}

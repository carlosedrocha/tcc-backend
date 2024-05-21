import { IsOptional, IsString } from 'class-validator';

export class UpdateItemTypeDto {
  @IsOptional()
  @IsString()
  name: string;
}

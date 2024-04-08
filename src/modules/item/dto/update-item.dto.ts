import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class UpdateItemDto extends PartialType(CreateItemDto) {
    @IsNotEmpty()
    @IsString()
    name: String;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    description: String;
  
    @IsNotEmpty()
    @IsString()
    category: String;
  
    @IsNotEmpty()
    @IsNumber()
    stock: number;
}

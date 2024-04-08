import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  id: number;


} 
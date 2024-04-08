import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class CreateItemDto {
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

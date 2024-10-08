import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DishOrderT {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class ItemOrderT {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  tabId: string;

  //todo make at least one required
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  dishes?: DishOrderT[];

  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  items?: ItemOrderT[];
}

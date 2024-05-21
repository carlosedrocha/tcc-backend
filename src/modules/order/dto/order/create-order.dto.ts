import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DishOrderT {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;
}

export class ItemOrderT {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  tabId: string;

  //todo make at least one required
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  dishes: DishOrderT[];

  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  items: ItemOrderT[];
}

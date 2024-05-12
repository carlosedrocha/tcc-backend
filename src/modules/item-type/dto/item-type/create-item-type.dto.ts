import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

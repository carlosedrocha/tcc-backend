import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTabDto {
  @IsOptional()
  @IsNumber()
  tabNumber: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

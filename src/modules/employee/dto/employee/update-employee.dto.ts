import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  cpf?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNumber()
  @IsNotEmpty()
  roleId?: number;
}

import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateRoleDto{
    @IsNotEmpty()
    @IsString()
    name: string;
  

}
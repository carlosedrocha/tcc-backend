import { OrderStatus } from "@prisma/client";
import { IsUUID, IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class UpdateOrderStatusDto {
    @IsUUID()
    @IsNotEmpty()
    orderId: string;
  
    @IsEnum(OrderStatus)
    status: OrderStatus;
  }
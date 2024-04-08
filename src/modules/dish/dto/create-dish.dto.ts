import { IsNotEmpty } from "class-validator";
import { Item } from "@prisma/client";
export class CreateDishDto {
    @IsNotEmpty()
    items: Item[]
}

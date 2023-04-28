import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  ArrayNotEmpty,
} from 'class-validator';
import { Product } from '../order.interface';

export class OrdersDto {
  id: string;
  orderDate: string;
  @IsNotEmpty()
  @ArrayNotEmpty()
  productsOrdered: Product[];
}

export class UpdateOrderDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  @ArrayNotEmpty()
  productsOrdered: Product[];
}

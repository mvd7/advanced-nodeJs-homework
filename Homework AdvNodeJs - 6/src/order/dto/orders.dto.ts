import {
  IsNotEmpty,
  MaxLength,
  MinLength,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { Product } from '../order.interface';
import { v4 as uuid } from 'uuid';
import { ProductEntity } from 'src/products/product.entity';
import { Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class OrdersDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  orderDate: string;
}

export class UpdateOrderDto {
  orderDate: Date;
}

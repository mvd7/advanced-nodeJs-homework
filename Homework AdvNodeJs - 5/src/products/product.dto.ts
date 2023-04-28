import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  id: string;
  @IsNotEmpty()
  productName: string;
  @IsNotEmpty()
  productPrice: number;
}

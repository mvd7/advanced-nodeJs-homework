import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  productPrice: number;
}

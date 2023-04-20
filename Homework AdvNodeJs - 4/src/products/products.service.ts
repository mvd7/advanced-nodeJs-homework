import { Injectable } from '@nestjs/common';
import { Product } from 'src/order/order.interface';

@Injectable()
export class ProductsService {
  products: Product[] = [
    { id: '1', productName: 'Product One', productPrice: 24 },
    { id: '2', productName: 'Product Two', productPrice: 44 },
    { id: '3', productName: 'Product Three', productPrice: 12 },
  ];

  getProducts() {
    return this.products;
  }
}

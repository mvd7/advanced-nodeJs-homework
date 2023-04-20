import { Injectable } from '@nestjs/common';
import { Product, Order } from './order.interface';

@Injectable()
export class OrderService {
  orders: Order[] = [
    {
      id: '1',
      orderDate: new Date(),
      productsOrdered: [
        { id: '1', productName: 'Product One', productPrice: 24 },
        { id: '2', productName: 'Product Two', productPrice: 44 },
        { id: '3', productName: 'Product Three', productPrice: 12 },
      ],
    },
  ];

  getOrders() {
    return this.orders;
  }
}

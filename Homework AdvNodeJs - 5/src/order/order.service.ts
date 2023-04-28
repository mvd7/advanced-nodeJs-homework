import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, Order } from './order.interface';
import { OrdersDto, UpdateOrderDto } from './dto/orders.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  orders: Order[] = [
    {
      id: '1',
      orderDate: new Date('2023-05-05').getTime(),
      productsOrdered: [
        { id: '1', productName: 'Product One', productPrice: 24 },
        { id: '2', productName: 'Product Two', productPrice: 44 },
        { id: '3', productName: 'Product Three', productPrice: 12 },
      ],
    },
    {
      id: '2',
      orderDate: new Date('2023-06-22').getTime(),
      productsOrdered: [
        { id: '1', productName: 'Product One Order 2', productPrice: 24 },
        { id: '2', productName: 'Product Two Order 2', productPrice: 44 },
        { id: '3', productName: 'Product Three Order 2', productPrice: 12 },
      ],
    },
    {
      id: '3',
      orderDate: new Date('2023-05-20').getTime(),
      productsOrdered: [
        { id: '1', productName: 'Product One Order 3', productPrice: 24 },
        { id: '2', productName: 'Product Two Order 3', productPrice: 44 },
        { id: '3', productName: 'Product Three Order 3', productPrice: 12 },
      ],
    },
  ];

  getOrders() {
    return this.orders;
  }

  findOrderById(id: string) {
    const order = this.orders.find((order) => order.id === id);

    return order;
  }

  createOrder(ordersDto: OrdersDto) {
    const order: Order = {
      ...ordersDto,
      id: uuid(),
      orderDate: new Date().getTime(),
    };
    this.orders.push(order);
    throw new HttpException(
      `Order with id ${order.id} was created.`,
      HttpStatus.CREATED,
    );
  }

  updateOrder(order: Order): void {
    const index = this.orders.findIndex((order) => order.id === order.id);
    if (index === -1) {
      throw new NotFoundException(`Order with id ${order.id} not found`);
    }
    this.orders[index] = order;
  }

  deleteOrder(id: string): void {
    const initialLength = this.orders.length;
    this.orders = this.orders.filter((order) => order.id !== id);
    if (initialLength === this.orders.length) {
      throw new NotFoundException(`Order with ID '${id}' not found`);
    }
    throw new HttpException(
      `Order with id ${id} was deleted.`,
      HttpStatus.ACCEPTED,
    );
  }
}

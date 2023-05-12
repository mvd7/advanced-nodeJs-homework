import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, Order } from './order.interface';
import { OrdersDto, UpdateOrderDto } from './dto/orders.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/products/product.entity';
import e from 'express';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  getOrders() {
    const orders = this.orderRepository.find({
      relations: ['productsOrdered'],
    });

    return orders;
  }

  getById(id: string) {
    const order = this.orderRepository.findOne({
      where: { id: id },
      relations: ['productsOrdered'],
    });
    return order;
  }

  async createOrder(ordersDto: OrdersDto, productId: string) {
    const product = await this.productRepository.findOneBy({ id: productId });

    const productInst = this.orderRepository.create({
      id: uuid(),
      ...ordersDto,
      orderDate: new Date(),
      productsOrdered: [product],
    });

    const saveOrder = await this.orderRepository.save(productInst);

    return saveOrder.id;
  }

  async updateOrder(id: string, updateDto: UpdateOrderDto) {
    const updatedOrder: Order = {
      id: id,
      ...updateDto,
      orderDate: new Date(),
    };

    const order = await this.orderRepository.preload({
      id: id,
      ...updatedOrder,
    });
  }

  async deleteOrder(id: string) {
    const order = await this.orderRepository.findOneBy({ id: id });

    if (!order) {
      return false;
    }
    await this.orderRepository.delete(id);
    return true;
  }
}

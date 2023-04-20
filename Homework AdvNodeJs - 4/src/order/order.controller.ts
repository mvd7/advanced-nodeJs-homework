import {
  Controller,
  Get,
  HttpCode,
  Param,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Query,
  Post,
  Body,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Response, Request, response } from 'express';
import { request } from 'http';
import { OrdersDto, UpdateOrderDto } from './dto/orders.dto';
import { Order } from './order.interface';

interface IdRouteParams {
  id: string;
}

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders() {
    const orders = this.orderService.getOrders();
    return orders;
  }

  @Get(':id')
  getOrdersById(@Req() request: Request, @Param() params: IdRouteParams) {
    console.log(params);
    const id: string = params.id;
    const order = this.orderService.findOrderById(id);

    if (order === undefined) {
      throw new HttpException(
        `Task with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return order;
  }

  @Post()
  create(@Body() body: OrdersDto) {
    console.log(body);
    const id = this.orderService.createOrder(body);

    return {
      message: 'Order was created',
      id: id,
    };
  }

  @Put()
  updateOrder(@Body() updateOrderDto: UpdateOrderDto): Order {
    const existingOrder = this.orderService.findOrderById(updateOrderDto.id);

    if (!existingOrder) {
      throw new NotFoundException(
        `Order with id ${updateOrderDto.id} not found`,
      );
    }

    const updatedOrder: Order = {
      ...existingOrder,
      ...updateOrderDto,
    };
    this.orderService.updateOrder(updatedOrder);
    return updatedOrder;
  }

  @Delete(':id')
  deleteOrder(@Req() request: Request, @Param() params: IdRouteParams): void {
    const id: string = params.id;
    console.log(id);
    const deletedOrder = this.orderService.deleteOrder(id);

    return deletedOrder;
  }
}

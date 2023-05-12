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
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Response, Request, response } from 'express';
import { request } from 'http';
import { OrdersDto, UpdateOrderDto } from './dto/orders.dto';
import { Order } from './order.interface';
import { JwtAuthGuard } from 'src/common/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/users/role.enum';
import { RolesGuard } from 'src/common/role-guard/roles.guard';
import { Roles } from 'src/common/role-guard/roles.decorator';

interface IdRouteParams {
  id: string;
}

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders() {
    const orders = this.orderService.getOrders();
    return orders;
  }

  @Get(':id')
  getById(@Param() params: IdRouteParams) {
    const id: string = params.id;
    const order = this.orderService.getById(id);
    if (order === undefined) {
      throw new HttpException(
        `Order with ID:${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return order;
  }

  @Post(':productId')
  create(@Body() body: OrdersDto, @Param('productId') productId: string) {
    const id = this.orderService.createOrder(body, productId);

    return {
      message: 'Order was created',
      id: id,
    };
  }

  @Put(':id')
  updateOrder(@Body() body: UpdateOrderDto, @Param('id') id: string) {
    return this.orderService.updateOrder(id, body);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    const deletedOrder = await this.orderService.deleteOrder(id);

    if (deletedOrder === false) {
      return `Order with id ${id} was not found.`;
    } else {
      return `Order with ${id} was deleted.`;
    }
  }
}

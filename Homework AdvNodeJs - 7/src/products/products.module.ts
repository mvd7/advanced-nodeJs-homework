import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([ProductEntity, OrderEntity]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}

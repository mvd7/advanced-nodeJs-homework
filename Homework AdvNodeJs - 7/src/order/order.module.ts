import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductsController } from 'src/products/products.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { RolesGuard } from 'src/common/role-guard/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity])],
  providers: [OrderService, ProductsService, RolesGuard],
  controllers: [OrderController, ProductsController],
})
export class OrderModule {}

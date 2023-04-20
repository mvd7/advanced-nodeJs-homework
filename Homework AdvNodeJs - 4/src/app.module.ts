import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { OrderController } from './order/order.controller';

@Module({
  imports: [OrderModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

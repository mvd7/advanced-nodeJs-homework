import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    OrderModule,
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'food_app_db',
      autoLoadEntities: true,
      synchronize: true,

      // logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

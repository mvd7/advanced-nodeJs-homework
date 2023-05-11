import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/order/order.interface';
import { OrderEntity } from 'src/order/entities/order.entity';
import { v4 as uuid } from 'uuid';

@Entity('products')
export class ProductEntity implements Product {
  @PrimaryColumn()
  id: string = uuid();

  @Column()
  productName: string;

  @Column({ type: 'bigint' })
  productPrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.productsOrdered, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;
}

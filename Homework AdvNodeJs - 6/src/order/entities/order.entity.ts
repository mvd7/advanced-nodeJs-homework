import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Order, Product } from '../order.interface';
import { ProductEntity } from 'src/products/product.entity';
import { v4 as uuid } from 'uuid';

@Entity('order')
export class OrderEntity implements Order {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @OneToMany(() => ProductEntity, (product) => product.order, {
    onDelete: 'CASCADE',
  })
  productsOrdered: ProductEntity[];
}

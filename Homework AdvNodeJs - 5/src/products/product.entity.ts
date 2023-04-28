import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Product } from 'src/order/order.interface';

@Entity('products')
export class ProductEntity implements Product {
  @PrimaryColumn()
  id: string;
  @Column()
  productName: string;
  @Column({ type: 'bigint' })
  productPrice: number;
}

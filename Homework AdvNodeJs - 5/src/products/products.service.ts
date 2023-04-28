import { Injectable } from '@nestjs/common';
import { Product } from 'src/order/order.interface';
import { ProductDto } from './product.dto';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  products: Product[] = [
    { id: '1', productName: 'Product One', productPrice: 24 },
    { id: '2', productName: 'Product Two', productPrice: 44 },
    { id: '3', productName: 'Product Three', productPrice: 12 },
  ];

  getAllProducts() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    return product;
  }
  async createProduct(productDto: ProductDto) {
    const product: Product = {
      ...productDto,
      id: uuid(),
    };

    const objOfProductEntity = this.productRepository.create(product);
    const productSaved = await this.productRepository.save(objOfProductEntity);
    console.log(productSaved);
    return product.id;
  }
}

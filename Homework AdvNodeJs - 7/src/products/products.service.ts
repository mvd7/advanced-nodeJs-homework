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

  getAllProducts() {
    return this.productRepository.find({ relations: ['order'] });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['order'],
    });
    return product;
  }
  async createProduct(productDto: ProductDto) {
    const product: Product = {
      id: uuid(),
      ...productDto,
    };

    const objOfProductEntity = this.productRepository.create(product);
    const productSaved = await this.productRepository.save(objOfProductEntity);
    console.log(productSaved);
    return product.id;
  }

  async deleteProduct(id: string) {
    const foundProduct = await this.productRepository.findBy({ id: id });

    if (foundProduct.length === 0) {
      return false;
    } else {
      await this.productRepository.delete(id);
      return true;
    }
  }
}

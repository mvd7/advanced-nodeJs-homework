import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  getAllProducts() {
    const products = this.productService.getAllProducts();
    return products;
  }

  @Get(':id')
  async findOne(@Req() request: Request, @Param() params: any) {
    const id: string = params.id;
    const product = await this.productService.findOne(id);
    console.log(product);
    if (product === null) {
      throw new HttpException(
        ` Product with id ${id} was not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  @Post()
  async create(@Body() body: ProductDto) {
    const id = await this.productService.createProduct(body);
    return {
      message: 'Product was created',
      id: id,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteProduct(id);

    if (deletedProduct === false) {
      return `Product with id ${id} not found.`;
    } else {
      return `Product with id ${id} was deleted.`;
    }
  }
}

import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
@Controller('products')
export class ProductsController {
  constructor(private readonly _products: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const id = await this._products.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return id;
  }
  @Get()
  async getAllProducts() {
    return await this._products.getProducts();
  }
  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this._products.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this._products.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this._products.deleteProduct(prodId);
    return null;
  }
}

import { ProductS, ProductDocument } from './../schema/product.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductS.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async insertProduct(
    title: string,
    desc: string,
    price: number,
  ): Promise<ProductS> {
    const product = {
      title,
      desc,
      price,
    };
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }
  async getProducts() {
    return await this.productModel.find().exec();
  }
  async getSingleProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return product;
  }
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    let product;
    this.findProduct(productId).then((p) => (product = p));
    const updatedProdect = { ...product };
    if (title) {
      updatedProdect.title = title;
    }
    if (desc) {
      updatedProdect.desc = desc;
    }
    if (price) {
      updatedProdect.price = price;
    }
    await this.productModel.findByIdAndUpdate(productId, updatedProdect);
  }
  async deleteProduct(prodId: string) {
    return this.productModel.findByIdAndRemove(prodId);
  }
  private async findProduct(prodId: string): Promise<ProductS> {
    const product = await this.productModel.findById(prodId).exec();
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}

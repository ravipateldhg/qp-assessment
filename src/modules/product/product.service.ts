import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Not, Repository, UpdateResult } from 'typeorm';
import { ProductDto, ProductItemInList } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(
    condition,
    limit: number,
    offset: number,
  ): Promise<ProductItemInList[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where(condition)
      .orderBy('product.createdAt', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  count(condition): Promise<number> {
    return this.productRepository.countBy(condition);
  }

  async createOrUpdate(data, id?: string): Promise<string> {
    const { name } = data;

    if (id) {
      const product: boolean = await this.productRepository.exists({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const productName: boolean = await this.productRepository.exists({
        where: { name, id: Not(id) },
      });

      if (productName) {
        throw new NotFoundException('Product name already exist');
      }

      await this.productRepository.update({ id }, data);
    } else {
      const product: boolean = await this.productRepository.exists({
        where: {
          name: name,
        },
      });

      if (product) {
        throw new ConflictException('Product already exist');
      }

      const productCreated = await this.productRepository.save(data);
      id = productCreated.id;
    }
    return id;
  }

  async delete(id: string): Promise<UpdateResult> {
    const product: boolean = await this.productRepository.exists({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepository.softDelete({
      id,
    });
  }

  findProducts(productIds: string[]): Promise<ProductItemInList[]> {
    return this.productRepository.find({
      where: {
        id: In(productIds),
      },
    });
  }

  async save(product: ProductDto[]) {
    this.productRepository.save(product);
  }
}

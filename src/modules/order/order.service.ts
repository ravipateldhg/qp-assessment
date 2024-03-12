import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { ProductItemInList } from '../product/dto/product.dto';
import { ProductQuantityDto, orderDetailsDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly productService: ProductService,
  ) {}

  findAll(userId: string, limit: number, offset: number) {
    return this.orderRepository.find({
      where: {
        userId,
      },
      relations: ['user', 'products'],
      select: ['id', 'userId', 'amount', 'createdAt'],
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  count(userId: string): Promise<number> {
    return this.orderRepository.countBy({ userId });
  }

  async create(
    orderData: ProductQuantityDto[],
    userId: string,
  ): Promise<orderDetailsDto> {
    const productQuantity: object = {};

    orderData.map((obj) => {
      productQuantity[`${obj.productId}`] = {
        quantity: obj.quantity,
        price: obj.price,
      };
    });
    const productIds: string[] = Object.keys(productQuantity);
    const products: ProductItemInList[] =
      await this.productService.findProducts(productIds);

    if (products.length !== productIds.length) {
      throw new NotFoundException('Some of the product not found');
    }

    let total: number = 0;
    for (let i = 0; i < productIds.length; i++) {
      const { quantity, price } = productQuantity[`${products[`${i}`].id}`];
      if (products[`${i}`].quantity < quantity) {
        throw new ConflictException(
          `Insufficient stock for product ${products[`${i}`].name}`,
        );
      }

      products[`${i}`].quantity -= quantity;
      total += price * quantity;
    }

    await this.productService.save(products);

    return this.orderRepository.save({
      products: orderData,
      userId,
      amount: total,
    });
  }
}

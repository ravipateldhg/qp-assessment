import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from 'src/core/role.guard';
import { Role, RoleEnum } from 'src/core/role.decorator';
import {
  OrderFilterDto,
  OrderListDto,
  ProductQuantityDto,
  orderDetailsDto,
} from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
@UseGuards(AuthGuard)
@UseGuards(RoleGuard)
@Role(RoleEnum.user)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({
    type: OrderListDto,
  })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  async findAll(
    @Query() query: OrderFilterDto,
    @Req() request,
  ): Promise<{ count: number; list: any }> {
    const { limit, offset } = query;

    const count: number = await this.orderService.count(request.user.id);
    const list = await this.orderService.findAll(
      request.user.id,
      limit,
      offset,
    );

    return { count, list };
  }

  @Post()
  @ApiBody({
    type: ProductQuantityDto,
    examples: {
      example1: {
        value: [
          {
            productId: 'string',
            quantity: 0,
            price: 0,
          },
        ],
      },
    },
  })
  async create(
    @Body() data: ProductQuantityDto[],
    @Req() request,
  ): Promise<orderDetailsDto> {
    return this.orderService.create(data, request.user.id);
  }
}

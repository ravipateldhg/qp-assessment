import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role, RoleEnum } from 'src/core/role.decorator';
import { ProductService } from './product.service';
import {
  ProductFilterDto,
  ProductListResponseDto,
  ProductDto,
  ProductItemInList,
} from './dto/product.dto';
import { ILike, UpdateResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from 'src/core/role.guard';

@ApiTags('Product')
@Controller('product')
@UseGuards(AuthGuard)
@UseGuards(RoleGuard)
@Role(RoleEnum.admin)
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOkResponse({
    type: ProductListResponseDto,
  })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  @ApiQuery({ name: 'name', type: String, required: false })
  async findAll(
    @Query() query: ProductFilterDto,
  ): Promise<ProductListResponseDto> {
    const { limit, offset, name } = query;
    const condition: Record<string, any> = {};
    if (name) {
      condition.name = ILike(`%${name}%`);
    }

    const count: number = await this.productService.count(condition);
    const list: ProductItemInList[] = await this.productService.findAll(
      condition,
      limit,
      offset,
    );

    return { count, list };
  }

  @Post()
  @ApiBody({
    type: ProductDto,
    examples: {
      example1: {
        value: {
          name: 'string',
          price: 0,
          quantity: 0,
        },
      },
    },
  })
  async create(@Body() data: ProductDto): Promise<string> {
    return this.productService.createOrUpdate(data);
  }

  @Patch(':id')
  @ApiBody({
    type: ProductDto,
    examples: {
      example1: {
        value: {
          name: 'string',
          price: 0,
          quantity: 0,
        },
      },
    },
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ProductDto,
  ): Promise<string> {
    return this.productService.createOrUpdate(data, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<UpdateResult> {
    return this.productService.delete(id);
  }
}

import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from 'src/modules/product/dto/product.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class ProductQuantityDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class OrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductQuantityDto)
  products: ProductQuantityDto[];
}

export class orderDetailsDto {
  products: ProductQuantityDto[];

  @IsString()
  userId: string;

  @IsNumber()
  amount: number;
}

export class OrderFilterDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}

export class OrderListDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsNumber()
  amount: number;

  user: UserDto;

  products: ProductDto;
}

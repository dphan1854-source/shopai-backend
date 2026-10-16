import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNumber, IsString, Min, ValidateNested } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ example: 'backend_prod_0', description: 'ID sản phẩm' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 2, minimum: 1, description: 'Số lượng đặt' })
  @IsNumber()
  @Min(1, { message: 'Số lượng tối thiểu là 1' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto], description: 'Danh sách sản phẩm trong giỏ' })
  @IsArray()
  @ArrayNotEmpty({ message: 'Giỏ hàng đang trống, không thể đặt hàng' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ example: 2000000, minimum: 0, description: 'Tổng tiền Client tính để đối chiếu' })
  @IsNumber()
  @Min(0)
  total: number;
}
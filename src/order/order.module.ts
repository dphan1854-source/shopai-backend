import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { OrderController } from './order.controller';
import { PrismaOrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [ProductModule], // Mượn ProductService từ Module hàng xóm (PrismaModule đã @Global, không cần import lại)
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: 'IOrderRepository', useClass: PrismaOrderRepository }, // Đổi useClass thành InMemoryOrderRepository là quay lại bản cũ — không sửa gì ở OrderService/Controller
  ],
})
export class OrderModule {}

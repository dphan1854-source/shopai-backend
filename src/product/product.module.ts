import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService], // ➕ MỚI — cho phép OrderModule mượn ProductService
})
export class ProductModule { }
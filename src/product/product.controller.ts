import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('api/products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    getProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id') // GET /api/products/backend_prod_3
    getProductById(@Param('id') id: string) {
        // @Param trích đoạn ':id' trong URL ra thành biến — tương đương Route Params của
        // React Navigation ở Chương 5, chỉ khác là nó đi qua đường dây mạng.
        return this.productService.getProductById(id);
    }
}
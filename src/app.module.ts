import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { HealthController } from './health.controller'; // ➕ MỚI

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductModule, AiModule],
  controllers: [HealthController], // ➕ MỚI — AppModule vốn không có controllers riêng, giờ thêm 1 cái
})
export class AppModule {}
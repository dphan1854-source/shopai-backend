import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  IOrderRepository,
  CreateOrderInput,
  OrderRecord,
} from './order.repository.interface';

@Injectable()
export class PrismaOrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: CreateOrderInput): Promise<OrderRecord> {
    return this.prisma.order.create({
      data: {
        id: order.id,
        userId: order.userId,
        total: order.total,
        status: order.status ?? 'PENDING',
        items: {
          create: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll(): Promise<OrderRecord[]> {
    return this.prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByUserId(userId: string): Promise<OrderRecord[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(orderId: string): Promise<OrderRecord | null> {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });
  }

  async updateStatus(orderId: string, status: string): Promise<OrderRecord> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: true,
      },
    });
  }
}

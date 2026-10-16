import { Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  CreateOrderInput,
  OrderRecord,
} from './order.repository.interface';

@Injectable()
export class InMemoryOrderRepository implements IOrderRepository {
  private orders: OrderRecord[] = [];

  async save(order: CreateOrderInput): Promise<OrderRecord> {
    const record: OrderRecord = {
      id: order.id,
      userId: order.userId,
      total: order.total,
      status: order.status ?? 'PENDING',
      createdAt: new Date(),
      items: order.items.map((item, idx) => ({
        id: `item_${Date.now()}_${idx}`,
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    this.orders.push(record);
    return record;
  }

  async findAll(): Promise<OrderRecord[]> {
    return [...this.orders];
  }

  async findByUserId(userId: string): Promise<OrderRecord[]> {
    return this.orders.filter((o) => o.userId === userId);
  }

  async findById(orderId: string): Promise<OrderRecord | null> {
    return this.orders.find((o) => o.id === orderId) ?? null;
  }

  async updateStatus(orderId: string, status: string): Promise<OrderRecord> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    order.status = status;
    return order;
  }
}

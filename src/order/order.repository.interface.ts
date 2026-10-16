export type CreateOrderItemInput = {
  productId: string;
  quantity: number;
  price: number;
};

export type CreateOrderInput = {
  id: string;
  userId: string;
  total: number;
  status?: string;
  items: CreateOrderItemInput[];
};

export type OrderRecord = {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: Date;
  items: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
};

// Bản hợp đồng — mô tả "Kho đơn hàng phải làm được những việc gì"
export interface IOrderRepository {
  save(order: CreateOrderInput): Promise<OrderRecord>;
  findAll(): Promise<OrderRecord[]>;
  findByUserId(userId: string): Promise<OrderRecord[]>;
  findById(orderId: string): Promise<OrderRecord | null>;
  updateStatus(orderId: string, status: string): Promise<OrderRecord>;
}

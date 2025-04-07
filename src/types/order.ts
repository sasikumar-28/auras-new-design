export interface OrderItem {
  quantity: number;
  subTotal: number;
  product: string | null;
}

export interface Order {
  orderId: number;
  orderDate: string;
  customerId: number | null;
  orderStatus: string | null;
  orderItems: OrderItem[];
  paymentMethod: string | null;
}

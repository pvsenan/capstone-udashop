import { CartItem } from "./CartItem";

export interface OrderItem {
  orderId: string,
  userId: string,
  createdAt: string,
  items: CartItem[],
  total: number,
  paymentId: string
}

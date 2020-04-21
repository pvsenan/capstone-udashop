import { CartRequest } from "./CartRequest";

export interface OrderRequest {
  orderId: string,
  userId: string,
  createdAt: string,
  items: CartRequest[],
  total: number,
  paymentId: string
}
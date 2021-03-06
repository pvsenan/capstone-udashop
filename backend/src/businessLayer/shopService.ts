import * as uuid from 'uuid';

import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';
import { PostsDataLayer } from '../dataLayer/shopDataLayer';
import { OrderRequest } from '../requests/OrderRequest';
import { parseUserId } from '../auth/utils';
import { createLogger } from '../utils/logger'
import { storeProducts } from './mock/products';

const postDataLayer = new PostsDataLayer();

const logger = createLogger('Shop service layer')
export async function getAllProducts(): Promise<Product[]> {
    console.log("fetching all available products")
    return storeProducts;
}

export async function getOrders(
    jwtToken: string
): Promise<OrderItem[]> {
    const userId = parseUserId(jwtToken);
    return await postDataLayer.getOrderForCurrentUser(userId);
}

export async function createOrder(
    createOrderRequest: OrderRequest,
    jwtToken: string,paymentId: string
): Promise<OrderItem> {
    const userId = parseUserId(jwtToken);

    return await postDataLayer.createOrder({
        orderId: createOrderRequest.orderId,
        userId: userId,
        items:createOrderRequest.items,
        total: createOrderRequest.total,
        paymentId:paymentId,
        createdAt: new Date().toISOString(),
    });
}

export async function deleteOrder(orderId: string,
    jwtToken: string
): Promise<void> {
    const userId = parseUserId(jwtToken);

    return await postDataLayer.deleteOrder(orderId,userId);
}

export async function generateOrderId(
    jwtToken: string
): Promise<string> {
    const orderId = uuid.v4();
    const userId = parseUserId(jwtToken);
    logger.info("Generating order id for user: " + userId)
    return orderId;
}

export async function authorizeAmount(
    orderId: string,
    authAmount: number,
    jwtToken: string,
): Promise<string> {
    const userId = parseUserId(jwtToken);
    const paymentId = uuid.v4();
    logger.info('Creating payment id '+ paymentId + ' for user: '+ userId);
    logger.info('Authorizing amount: '+ authAmount + ' for order: '+ orderId)
    return paymentId;
}
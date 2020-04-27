import * as AWS from 'aws-sdk';
import { DocumentClient, DeleteItemInput } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger'
import { OrderItem } from '../models/OrderItem';
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

export class PostsDataLayer {
	
	public constructor(
		private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
		private readonly ordersTable = process.env.ORDERS_TABLE,
		private readonly orderIndex = process.env.ORDER_INDEX,
	) {}

	public async getOrderForCurrentUser(userId: string): Promise<OrderItem[]> {
		
		const logger = createLogger('order-fetcher')
		logger.info('Getting all ToDo items for current user ')
		
		const result = await this.docClient
			.query({
				TableName: this.ordersTable,
				IndexName: this.orderIndex,
				KeyConditionExpression:'userId = :userId',
                ExpressionAttributeValues: {
					':userId' : userId
                }
			})
			.promise();

		const items = result.Items;
		return items as OrderItem[];
	}
	
	public async createOrder(OrderItem: OrderItem): Promise<OrderItem> {
		const logger = createLogger('create-order')
		logger.info('Creating a new order ', { ...OrderItem })

		await this.docClient
		.put({
			TableName: this.ordersTable,
			Item: OrderItem,
		})
		.promise()
		
		return OrderItem;
	  }
}
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
		private readonly orderIdIndex = process.env.ORDERID_INDEX,
	) {}

	public async getOrderForCurrentUser(userId: string): Promise<OrderItem[]> {
		
		const logger = createLogger('order-fetcher')
		logger.info('Getting all ToDo items for current user ')
		
		const result = await this.docClient
			.query({
				TableName: this.ordersTable,
				IndexName: this.orderIdIndex,
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
	  

    public async getPost(postId: string, userId: string): Promise<OrderItem> {
		const logger = createLogger('order-fetcher')
		logger.info('Getting single post from user')

		const result = await this.docClient
		.query({
			TableName: this.ordersTable,
			KeyConditionExpression: 'userId = :userId and postId = :postId',
			ExpressionAttributeValues: {
				':userId': userId,
				':postId': postId 
			}
		})
		.promise();
		const item = result.Items[0];
		return item as OrderItem;
    }


 /*   public async updatePost(
		postId: string,
		userId: string,
		createdAt: string
		
	): Promise<void> {

		const logger = createLogger('update-posts-logger')
		logger.info('Updating a post item ', { ...postUpdate })

		const updatedItem = await this.docClient
			.update({
				TableName: this.ordersTable,
				Key: { postId, userId},
				UpdateExpression: 'set #name = :n, createdAt = :changedAt, attachmentUrl = :attachmentUrl',
				ExpressionAttributeNames: {
					'#name': 'name'
				},
				ExpressionAttributeValues: {
					':n': postUpdate.name,
					':changedAt': createdAt,
					':attachmentUrl': postUpdate.attachmentUrl
				},
				ReturnValues: 'UPDATED_NEW'
			})
			.promise()

		logger.info('Updated Item:', updatedItem)

    }*/

    public async setAttachmentUrl(
		postId: string,
		userId: string,
        createdAt: string,
        attachmentUrl: string,
    ): Promise<void> {
		
		const logger = createLogger('set-attachment-url')
		logger.info('Adding attachment url for posts', { attachmentUrl })

        await this.docClient
            .update({
                TableName: this.ordersTable,
                Key: {
                    postId,
                    userId
                },
                UpdateExpression: 'set attachmentUrl = :attachmentUrl, createdAt =:updtAt',
                ExpressionAttributeValues: {
					':attachmentUrl': attachmentUrl,
					':updtAt' : createdAt
                },
                ReturnValues: 'UPDATED_NEW',
            })
            .promise();
	}
	


}
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { OrderRequest } from '../../requests/OrderRequest'
import { createOrder } from '../../businessLayer/shopService';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const newOrder: OrderRequest = JSON.parse(event.body)
	const authorization = event.headers.Authorization;
	const paymentId = event.headers.PaymnetId;
	const split = authorization.split(' ');
	const jwtToken = split[1];
	
	const savedOrder = await createOrder(newOrder, jwtToken, paymentId);

	return {
		statusCode: 201,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({
			item: savedOrder
		})
	}
}

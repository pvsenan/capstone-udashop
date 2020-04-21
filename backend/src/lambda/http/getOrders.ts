import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { OrderRequest } from '../../requests/OrderRequest'
import { createOrder, getOrders } from '../../businessLayer/shopService';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const newOrder: OrderRequest = JSON.parse(event.body)
	const authorization = event.headers.Authorization;
	const split = authorization.split(' ');
	const jwtToken = split[1];
	
	const order = await getOrders(jwtToken);

	return {
		statusCode: 201,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({
			item: order
		})
	}
}

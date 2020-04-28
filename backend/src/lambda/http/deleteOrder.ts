import 'source-map-support/register'
import { deleteOrder } from '../../businessLayer/shopService';


import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const authorization = event.headers.Authorization;
	const orderId = event.pathParameters.orderId
	const split = authorization.split(' ');
	const jwtToken = split[1];
	
	await deleteOrder(orderId, jwtToken);

	return {
		statusCode: 202,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: ''
	}
}

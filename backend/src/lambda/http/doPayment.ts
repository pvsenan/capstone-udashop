import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { authorizeAmount } from '../../businessLayer/shopService';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const orderId = event.pathParameters.orderId
	const authAmount = event.pathParameters.Amount
	const authorization = event.headers.Authorization
	const split = authorization.split(' ')
	const jwtToken = split[1]

	const paymentId = await authorizeAmount(orderId, authAmount, jwtToken);

	return {
		statusCode: 202,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body:JSON.stringify({
			item: paymentId
		})
	}
}
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { authorizeAmount } from '../../businessLayer/shopService';
import { PaymentRequest } from '../../requests/PaymentRequest';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const paymentRequest: PaymentRequest = JSON.parse(event.body)
	const orderId = paymentRequest.orderId
	const authAmount = paymentRequest.orderAmount
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
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getAllProducts } from '../../businessLayer/shopService';

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
	const allProducts = await getAllProducts();

	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true
		},
		body: JSON.stringify({
			items: allProducts
		})
	}
}
import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda'

import Response from './response'

export const createHandler = (controller: Controller<RestAPIGatewayEvent, ObjectOf<unknown>>) => {
	const handler: Handler<RestAPIGatewayEvent, APIGatewayProxyStructuredResultV2> = async (
		event,
		context
	) => {
		try {
			const result = await controller(event, context)
			return Response.success(result, context)
		} catch (error) {
			return Response.error(error, context)
		}
	}

	return handler
}

export const safeParse = (data: string) => {
	try {
		return JSON.parse(data)
	} catch (error) {
		return null
	}
}

import { datatype } from 'faker'

export function createFakeRestEvent(overrides: Partial<RestAPIGatewayEvent> = {}): RestAPIGatewayEvent {
	const event: RestAPIGatewayEvent = {
		cookies: [],
		headers: {},
		queryStringParameters: {},
		requestContext: {
			accountId: '1234567890',
			apiId: '0987654321',
			http: {
				method: 'GET',
				path: '/',
				protocol: 'https',
				sourceIp: '0.0.0.0.0',
				userAgent: ''
			},
			requestId: datatype.uuid(),
			stage: 'test',
			timeEpoch: Date.now()
		},
		body: '',
		pathParameters: {},
		stageVariables: {}
	}

	return {
		...event,
		...overrides
	}
}

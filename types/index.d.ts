interface ObjectOf<T> {
	[key: string]: T
}

interface RestAPIGatewayEvent {
	body: string
	pathParameters: ObjectOf<string>
	stageVariables: ObjectOf<string>
	cookies: string[]
	headers: ObjectOf<string>
	queryStringParameters: ObjectOf<string>

	requestContext: {
		accountId: string
		apiId: string

		http: {
			method: string
			path: string
			protocol: string
			sourceIp: string
			userAgent: string
		}

		requestId: string
		stage: string
		timeEpoch: number
	}
}

interface Context {
	awsRequestId: string
	functionName: string
	functionVersion: string
}

type Controller<E, R> = (event: E, context: Context) => Promise<R>
type Handler<T, R> = (event: T, context: Context) => Promise<R>

import { ApplicationError } from './errors'

const getErrorContext = (e: Error, context: Context) => {
	const error = e instanceof ApplicationError ? e : new ApplicationError()

	const content = {
		context: {
			requestId: context.awsRequestId,
			service: context.functionName,
			version: context.functionVersion
		},
		error: error.statusText,
		message: error.message
	}

	console.error(
		'Application Error:',
		JSON.stringify({
			content,
			original: {
				name: e.name,
				message: e.message
			}
		})
	)

	return {
		error,
		content
	}
}

const success = (body: { [key: string]: any }, context: Context) => {
	return {
		body: JSON.stringify(body),
		headers: { 'X-AWS-ID': context.awsRequestId, 'Content-Type': 'application/json' },
		statusCode: 200
	}
}

const error = (e: Error, context: Context) => {
	const { error, content } = getErrorContext(e, context)

	return {
		body: JSON.stringify(content),
		headers: { 'X-AWS-ID': context.awsRequestId, 'Content-Type': 'application/json' },
		statusCode: error.statusCode
	}
}

export default { success, error }

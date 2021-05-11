export class ApplicationError extends Error {
	public statusText: string
	public statusCode: number

	constructor(
		message = 'An unknown error has occurred. Try again later.',
		statusCode = 500,
		statusText = 'Internal Server Error'
	) {
		super(message)
		this.name = this.constructor.name
		this.statusCode = statusCode
		this.statusText = statusText
	}
}

export class BadRequestError extends ApplicationError {
	constructor(message: string) {
		super(message, 400, 'Bad Request')
	}
}

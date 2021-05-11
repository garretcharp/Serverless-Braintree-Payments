import { BadRequestError } from '../../../../util/errors'
import { createTransaction } from '../../../../services/braintree'
import { createHandler, safeParse } from '../../../../util'

const validateBody = (event: RestAPIGatewayEvent) => {
	const body = safeParse(event.body)

	if (body === null)
		throw new BadRequestError('Invalid request must provide amount and payment nonce')

	if (typeof body.nonce !== 'string' || body.nonce.trim() === '')
		throw new BadRequestError('Invalid request must provide payment nonce')

	if (typeof body.amount !== 'string' || !/[0-9]+\.[0-9]{2}/.test(body.amount))
		throw new BadRequestError('Invalid request must provide payment amount')

	return body as { amount: string; nonce: string }
}

const controller = async (event: RestAPIGatewayEvent, _context: Context) => {
	const { transaction } = await createTransaction(validateBody(event))

	return {
		success: true,
		transaction: {
			id: transaction.id
		}
	}
}

export const handler = createHandler(controller)

import { BraintreeGateway, Environment } from 'braintree'
import { ApplicationError } from '../util/errors'
import { insertTransaction } from '../repositories/transactionRepository'

export const gateway = new BraintreeGateway({
	// as 'Sandbox' is used to make the typescript compiler happy
	environment: Environment[String(process.env.BRAINTREE_ENVIRONMENT) as 'Sandbox'],
	merchantId: String(process.env.BRAINTREE_MERCHANT),
	publicKey: String(process.env.BRAINTREE_PUBLIC),
	privateKey: String(process.env.BRAINTREE_PRIVATE)
})

interface TransactionInput {
	amount: string
	nonce: string
}

export const createTransaction = async ({ amount, nonce }: TransactionInput) => {
	const result = await gateway.transaction.sale({
		amount,
		paymentMethodNonce: nonce,
		options: {
			submitForSettlement: true
		}
	})

	if (result.success !== true) throw new ApplicationError('Could not process your payment')

	await insertTransaction({ id: result.transaction.id })

	return result
}

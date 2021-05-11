import { createTransaction } from './braintree'

describe('Braintree Service', () => {
	it('Creates Transaction Successfully', async () => {
		expect.assertions(3)

		const transaction = await createTransaction({
			nonce: 'fake-valid-nonce',
			amount: '10.00'
		})

		expect(transaction).toMatchObject({ success: true })
		expect(transaction).toHaveProperty('transaction')
		expect(transaction).toHaveProperty('transaction.id')
	})

	it('Throws on Bad Nonce', async () => {
		expect.assertions(1)

		try {
			await createTransaction({
				amount: '10.00',
				nonce: 'fake-luhn-invalid-nonce'
			})
		} catch (error) {
			expect(error).toBeTruthy()
		}
	})
})

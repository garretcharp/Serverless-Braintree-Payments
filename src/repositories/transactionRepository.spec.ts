import { datatype } from 'faker'
import { insertTransaction } from './transactionRepository'

describe('Transaction Repository', () => {
	it('Inserts Transaction', async () => {
		expect.assertions(1)

		const id = datatype.uuid()
		const transaction = await insertTransaction({ id })
		expect(transaction).toMatchObject({ id })
	})
})

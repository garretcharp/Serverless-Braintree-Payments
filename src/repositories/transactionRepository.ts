import { client } from './client'

interface TransactionItem {
	id: string
}

export const insertTransaction = async ({ id }: TransactionItem) => {
	await client
		.put({
			TableName: String(process.env.DYNAMO_TABLE_NAME),
			Item: {
				PK: `TRANSACTION#${id}`,
				SK: 'transaction',
				id
			}
		})
		.promise()

	return { id }
}

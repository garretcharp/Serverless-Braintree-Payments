import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const isOffline = !!process.env.IS_OFFLINE || !!process.env.JEST_WORKER_ID

export const client = isOffline
	? new DocumentClient({
			region: 'localhost',
			endpoint: 'http://localhost:8000'
	  })
	: new DocumentClient()

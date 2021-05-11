import { datatype } from 'faker'

export function createFakeContext(overrides: Partial<Context> = {}): Context {
	const ctx: Context = {
		awsRequestId: datatype.uuid(),
		functionName: 'MyFunction',
		functionVersion: '1'
	}

	return {
		...ctx,
		...overrides
	}
}

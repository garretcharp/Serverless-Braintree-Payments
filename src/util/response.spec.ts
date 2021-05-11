import Response from './response'

import { createFakeContext } from '../../__test__/fixtures/context'
import { ApplicationError } from './errors'

describe('Response Util', () => {
	it('Creates A Success Response', async () => {
		expect.assertions(3)

		const body = {
			hello: 'world'
		}

		const res = Response.success(body, createFakeContext())

		expect(res).toBeDefined()
		expect(res.body).toEqual(JSON.stringify(body))
		expect(res.statusCode).toEqual(200)
	})

	it('Creates An Error Response', async () => {
		expect.assertions(3)

		const error = new ApplicationError()

		const res = Response.error(error, createFakeContext())

		expect(res).toBeDefined()
		expect(JSON.parse(res.body)).toMatchObject({
			error: error.statusText,
			message: error.message
		})
		expect(res.statusCode).toEqual(error.statusCode)
	})

	it('Changes Errors to instanceof ApplicationError', async () => {
		expect.assertions(3)

		const applicationError = new ApplicationError()

		const error = new Error('This message should not show')

		const res = Response.error(error, createFakeContext())

		expect(res).toBeDefined()
		expect(JSON.parse(res.body)).toMatchObject({
			error: applicationError.statusText,
			message: applicationError.message
		})
		expect(res.statusCode).toEqual(applicationError.statusCode)
	})
})

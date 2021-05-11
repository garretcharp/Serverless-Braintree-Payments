import { createFakeContext } from '../../../../../__test__/fixtures/context'
import { createFakeRestEvent } from '../../../../../__test__/fixtures/restEvent'

import { handler } from './controller'

describe('Payments Controller', () => {
	it('Processes Valid Transaction Successfully', async () => {
		expect.assertions(3)

		const response = await handler(
			createFakeRestEvent({
				body: JSON.stringify({
					nonce: 'fake-valid-nonce',
					amount: '12.00'
				})
			}),
			createFakeContext()
		)

		expect(response).toBeDefined()
		expect(response.statusCode).toEqual(200)
		expect(JSON.parse(response.body ?? '{}')).toMatchObject({ success: true })
	})

	it('Errors on No Nonce', async () => {
		expect.assertions(2)

		const response = await handler(
			createFakeRestEvent({
				body: JSON.stringify({
					nonce: '',
					amount: '10.00'
				})
			}),
			createFakeContext()
		)

		expect(response).toBeDefined()
		expect(response.statusCode).toEqual(400)
	})

	it('Errors on Invalid Nonce', async () => {
		expect.assertions(2)

		const response = await handler(
			createFakeRestEvent({
				body: JSON.stringify({
					nonce: 'fake-luhn-invalid-nonce',
					amount: '10.00'
				})
			}),
			createFakeContext()
		)

		expect(response).toBeDefined()
		expect(response.statusCode).toEqual(500)
	})

	it('Errors on Invalid Amount', async () => {
		expect.assertions(2)

		const response = await handler(
			createFakeRestEvent({
				body: JSON.stringify({
					nonce: 'fake-valid-nonce',
					amount: 'invalid'
				})
			}),
			createFakeContext()
		)

		expect(response).toBeDefined()
		expect(response.statusCode).toEqual(400)
	})

	it('Errors on Invalid Body', async () => {
		expect.assertions(2)

		const response = await handler(
			createFakeRestEvent({
				body: ''
			}),
			createFakeContext()
		)

		expect(response).toBeDefined()
		expect(response.statusCode).toEqual(400)
	})

	it('Errors on Processor Error', async () => {
		expect.assertions(2)

		const response = await handler(
			createFakeRestEvent({
				body: JSON.stringify({
					nonce: 'fake-valid-nonce',
					amount: '3000.00'
				})
			}),
			createFakeContext()
		)

		expect(response).toBeDefined()
		expect(response.statusCode).toEqual(500)
	})
})

const Serverless = require('serverless')

const getConfig = async () => {
	const serverless = new Serverless()
	await serverless.init()

	const service = await serverless.variables.populateService()

	const resourceList = []

	for (const { Resources } of service.resources) {
		for (const source of Object.keys(Resources)) {
			resourceList.push(Resources[source])
		}
	}

	const tables = Array.from(resourceList).filter(r => r.Type === 'AWS::DynamoDB::Table').map(r => r.Properties)

	for (const variable of Object.keys(service.provider.environment)) {
		process.env[variable] = service.provider.environment[variable]
	}

	return {
		tables,
		port: 8000
	}
}

module.exports = getConfig

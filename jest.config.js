module.exports = {
	preset: '@shelf/jest-dynamodb',
	maxConcurrency: 1,
	maxWorkers: 1,
	setupFiles: ['dotenv/config']
}

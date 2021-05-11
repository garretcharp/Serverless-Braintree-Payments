# Serverless Braintree Payment Example

This example application is an AWS serverless application that processes payments using Braintree. It uses the serverless framework for developing locally and deploying to AWS. Jest is used for testing the application. Webpack is used to ensure each function is using only what it requires allowing for faster cold starts - cold starts can be eliminated by using reserved concurrency though cold starts should not be noticable.

## Setup

This project uses PNPM. However, you can use NPM or Yarn instead change the commands to fit your needs.

Step one is to install dependencies:

```
pnpm install
```

Next, you need to create a [Braintree sandbox account](https://www.braintreepayments.com/sandbox)

And create a `.env` file with the following values (all of them can be found in the API Settings):

```
BRAINTREE_ENVIRONMENT = "Sandbox"
BRAINTREE_MERCHANT = "your merchant id"
BRAINTREE_PUBLIC = "your public api key"
BRAINTREE_PRIVATE = "your private api key"
```

## Running Tests

To run tests you can simply run:

```
pnpm run test
```

### Current Coverage

The current coverage stats are:

| File                              | % Statments | % Branch | % Functions | % Lines | Uncovers Line #s |
| --------------------------------- | ----------- | -------- | ----------- | ------- | ---------------- |
| All                               | 100         | 95.24    | 100         | 100     |                  |
| \_functions/rest/payments/process | 100         | 100      | 100         | 100     |                  |
| \_\_controller.ts                 | 100         | 100      | 100         | 100     |                  |
| \_repositories                    | 100         | 75       | 100         | 100     |                  |
| \_\_client.ts                     | 100         | 75       | 100         | 100     | 5                |
| \_\_transactionRepository.ts      | 100         | 100      | 100         | 100     |                  |
| \_services                        | 100         | 100      | 100         | 100     |                  |
| \_\_braintree.ts                  | 100         | 100      | 100         | 100     |                  |
| \_util                            | 100         | 100      | 100         | 100     |                  |
| \_\_errors.ts                     | 100         | 100      | 100         | 100     |                  |
| \_\_index.ts                      | 100         | 100      | 100         | 100     |                  |
| \_\_response.ts                   | 100         | 100      | 100         | 100     |                  |

Note: The repositories/client.ts file has 1 uncovered line because of the different options used for running offline/on AWS. Realistically the test coverage is 100% across the board.

## Running Locally

If you wish to test/develop locally using serverless offline, you must install and start DynamoDB as well as serverless offline with the following commands:

```
pnpm run dynamo:install
pnpm run dynamo:start
pnpm run dev
```

## Project Structure

### Functions

The functions folder holds all of the lambda controllers. It can have 3 nested folders Rest, Chron, and WebSockets. Of which only Rest is used in this example. To keep things simple the folder structure matches the url of the routes for each lambda function.

Every lambda function has 4 files:

-   controller.ts - The handling of the function
-   controller.spec.ts - Testing the controller
-   function.yml - Defines values of the function for serverless framework
-   role.yml - Defines the role for this function

### Repositories

The repositories folder holds all of the code for interacting with DynamoDB. Currently we only store transactions so there is only a transaction repository that will insert any transactions that happen.

### Services

The services folder holds all of the code for interaction with 3rd party services such as Braintree. Currently we only create a transaction so we only have one function that handles this.

### Utils

The utils folder holds any small helper functions. Currently it has 4 things, application errors, response helper, converting a controller to lambda handler, and a non throwing JSON.parse function.

## Serverless.yml

In order to simplify things the main serverless.yml file mainly holds some basic configuration and not the actual functions themselves - that is delegated off to be handled under each lambdas folder as explained in the Functions section of Project Structure.

For configuration items such as DynamoDB or S3 it is under the configuration folder.

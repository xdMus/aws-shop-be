import type { AWS } from '@serverless/typescript';

import getProductsList from './src/functions/getProductsList';
import getProductsById from './src/functions/getProductById';
import createProduct from './src/functions/createProduct';
import deleteProductById from './src/functions/deleteProductById';
import updateProduct from './src/functions/updateProduct';
import catalogBatchProcess from './src/functions/catalogBatchProcess';

import envConfig from './envConfig.json';
import snsConfig from './snsConfig.json';

const serverlessConfiguration: AWS = {
	service: 'productservice',
	frameworkVersion: '3',
	plugins: ['serverless-offline', 'serverless-esbuild'],
	provider: {
		region: 'eu-west-1',
		name: 'aws',
		runtime: 'nodejs14.x',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			...envConfig,
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			SNS_ARN: { Ref: 'SNSTopic' },
		},
		iamRoleStatements: [
			{
				Effect: 'Allow',
				Action: 'sqs:*',
				Resource: [{ 'Fn::GetAtt': ['SQSQueue', 'Arn'] }],
			},
			{
				Effect: 'Allow',
				Action: 'sns:*',
				Resource: [{ Ref: 'SNSTopic' }],
			},
		],
	},
	resources: {
		Resources: {
			SQSQueue: {
				Type: 'AWS::SQS::Queue',
				Properties: { QueueName: 'catalogItemsQueue' },
			},
			SNSTopic: {
				Type: 'AWS::SNS::Topic',
				Properties: { TopicName: 'createProductTopic' },
			},
			SNSSubscription: {
				Type: 'AWS::SNS::Subscription',
				Properties: {
					Endpoint: snsConfig.COMMON_EMAIL,
					Protocol: 'email',
					TopicArn: { Ref: 'SNSTopic' },
					FilterPolicy: {
						price: [{ numeric: ['<', 1000] }],
					},
				},
			},
			SNSSubscriptionForManagers: {
				Type: 'AWS::SNS::Subscription',
				Properties: {
					Endpoint: snsConfig.MANAGER_EMAIL,
					Protocol: 'email',
					TopicArn: { Ref: 'SNSTopic' },
					FilterPolicy: {
						price: [{ numeric: ['>=', 1000] }],
					},
				},
			},
		},
	},
	functions: {
		getProductsList,
		getProductsById,
		createProduct,
		deleteProductById,
		updateProduct,
		catalogBatchProcess,
	},
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: true,
			sourcemap: true,
			exclude: ['aws-sdk', 'pg-native'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;

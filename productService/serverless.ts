import type { AWS } from '@serverless/typescript';

import getProductsList from './src/functions/getProductsList';
import getProductsById from './src/functions/getProductById';

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
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
		},
	},
	// import the function via paths
	functions: { getProductsList, getProductsById },
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: true,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;

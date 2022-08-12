import { handlerPath } from '../../utils/handler-resolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'import',
				cors: true,
				authorizer: {
					arn: 'arn:aws:lambda:eu-west-1:975442346067:function:authorization-service-dev-basicAuthorizer',
					name: 'basicAuthorizer',
					type: 'TOKEN',
					identitySource: 'method.request.header.Authorization',
				},
			},
		},
	],
};

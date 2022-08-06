import { handlerPath } from '../../utils/handler-resolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			sqs: {
				batchSize: 5,
				arn: {
					'Fn::GetAtt': ['SQSQueue', 'Arn'],
				},
			},
		},
	],
};

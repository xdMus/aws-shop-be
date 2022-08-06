import { SQS } from 'aws-sdk';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

export const sendSQSMessage = async (sqs: SQS, body: unknown) => {
	const request: SendMessageRequest = {
		QueueUrl: process.env.SQS_URL,
		MessageBody: JSON.stringify(body),
	};

	await sqs.sendMessage(request).promise();
};

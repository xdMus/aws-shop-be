import SNS, { PublishInput } from 'aws-sdk/clients/sns';

export const publishRequest = async (
	requestBody: unknown,
	subject?: string,
	MessageAttributes?: SNS.MessageAttributeMap,
) => {
	const sns = new SNS({ region: 'eu-west-1' });

	const request: PublishInput = {
		Subject: subject ?? 'Re',
		Message: JSON.stringify(requestBody, null, 2),
		TopicArn: process.env.SNS_ARN,
		MessageAttributes,
	};

	await sns.publish(request).promise();
};

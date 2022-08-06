import { CopyObjectRequest } from 'aws-sdk/clients/s3';
import { S3 } from 'aws-sdk';
import { Logger } from '../libs/logger/Logger';

const logger = new Logger('Copy service');

export const copyToParsedFolder = async (s3: S3, params: { Bucket: string; Key: string }) => {
	const copyObjectRequest: CopyObjectRequest = {
		Bucket: params.Bucket,
		CopySource: `${params.Bucket}/${params.Key}`,
		Key: params.Key.replace('uploaded/', 'parsed/'),
	};

	logger.log('Start copying files');
	return await s3.copyObject(copyObjectRequest).promise();
};

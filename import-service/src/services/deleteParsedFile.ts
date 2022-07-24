import { S3 } from 'aws-sdk';
import { Logger } from '../libs/logger/Logger';

const logger = new Logger('Delete service');

export const deleteParsedFile = async (s3: S3, params: { Bucket: string; Key: string }) => {
	logger.log('Deleting parsed files');
	await s3.deleteObject(params).promise();
};

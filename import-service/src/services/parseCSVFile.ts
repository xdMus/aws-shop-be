import { S3 } from 'aws-sdk';
import csvParser from 'csv-parser';
import { Logger } from '../libs/logger/Logger';

const logger = new Logger('Parsing service');

export const parseCSVFile = async (s3: S3, params: { Bucket: string; Key: string }) => {
	return await new Promise((resolve, reject) => {
		const parsedFiles: Promise<void>[] = [];

		logger.log('Start parsing files');
		const s3stream = s3.getObject(params).createReadStream().pipe(csvParser());

		s3stream
			.on('data', (data) => logger.log(JSON.stringify(data)))
			.on('error', () => {
				logger.error('Parsing error');
				return reject('Parsing error');
			})
			.on('end', async () => {
				await Promise.allSettled(parsedFiles);
				resolve(parsedFiles);
			});
	});
};

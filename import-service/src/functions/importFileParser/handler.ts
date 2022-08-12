import { APIGatewayProxyStructuredResultV2, S3Event } from 'aws-lambda';
import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';
import { HTTPError } from '../../errors/http-error.class';
import { middyfy } from '../../utils/lambda';
import { parseCSVFile } from '../../services/parseCSVFile';
import { S3, SQS } from 'aws-sdk';
import config from '../../../config.json';
import { copyToParsedFolder } from '../../services/copyToParsedFolder';
import { deleteParsedFile } from '../../services/deleteParsedFile';
import { sendSQSMessage } from '../../services/sendSQSMessage';

export const importFileParser = async (
	event: S3Event,
): Promise<APIGatewayProxyStructuredResultV2> => {
	try {
		try {
			const s3 = new S3({ region: config.REGION });
			const sqs = new SQS({ region: config.REGION });

			const fileRecords = event.Records.filter((record) => !!record.s3.object.size);

			const result = fileRecords.map(async (record) => {
				const params = {
					Bucket: record.s3.bucket.name,
					Key: record.s3.object.key,
				};

				const parsedFiles = await parseCSVFile(s3, params);
				const copyResult = await copyToParsedFolder(s3, params);

				if (copyResult) {
					await deleteParsedFile(s3, params);
				}

				await sendSQSMessage(sqs, parsedFiles);
				return parsedFiles;
			});

			await Promise.allSettled(result);
			return formatJSONResponse(200, {
				message: 'Products parsed successfully',
			});
		} catch (e) {
			return formatErrorResponse(new HTTPError(400, e.message, 'Parsing'));
		}
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(importFileParser);

import { S3 } from 'aws-sdk';
import config from '../../config.json';

export const getSignedUrl = async (fileName: string) => {
	const s3Instance = new S3({ region: config.REGION });

	return await s3Instance.getSignedUrlPromise('putObject', {
		Bucket: config.BUCKET_NAME,
		Key: `${config.UPLOAD_FOLDER_NAME}/${fileName}`,
		Expires: config.EXPIRATION_TIME,
		ContentType: 'text/csv',
	});
};

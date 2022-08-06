import { handlerPath } from '../../utils/handler-resolver';
import config from '../../../config.json';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			s3: {
				bucket: config.BUCKET_NAME,
				event: 's3:ObjectCreated:*',
				rules: [{ prefix: `${config.UPLOAD_FOLDER_NAME}/` }, { suffix: '.csv' }],
				existing: true,
			},
		},
	],
};

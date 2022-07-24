import { getSignedUrl } from '../../services/getSignedUrl';
import { importProductsFileHandler } from './handler';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { schema } from './schema';
import { HTTPError } from '../../errors/http-error.class';

jest.mock('../../services/getSignedUrl');

const MOCK_URL = 'https://aws-my-link-to-upload.com';

const mockEvent: ValidatedAPIGatewayProxyEvent<typeof schema> = {
	queryStringParameters: {
		name: 'products.csv',
	},
} as any;

describe('importProductsFileHandler', () => {
	it('should return correct successful response', async () => {
		(getSignedUrl as jest.Mock).mockImplementationOnce(() => MOCK_URL);

		const result = await importProductsFileHandler(mockEvent);

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.body)).toEqual(MOCK_URL);
	});

	it('should return correct error response', async () => {
		(getSignedUrl as jest.Mock).mockImplementationOnce(() => {
			throw new HTTPError(400, 'Failed to connect to S3');
		});

		const result = await importProductsFileHandler(mockEvent);

		expect(result.statusCode).toEqual(400);
		expect(JSON.parse(result.body).error.message).toEqual('Service: Failed to connect to S3');
	});
});

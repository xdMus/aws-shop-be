import { createProductHandler } from './handler';
import { schema } from './schema';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { createProduct } from '../../services/products/createProduct';

jest.mock('../../services/products/createProduct');

const MOCK_PRODUCT = {
	title: 'Ferrari',
	description: 'Fast sport car',
	price: 200000,
	count: 1,
};

describe('createProductHandler', () => {
	it('should return correct successful response ', async () => {
		(createProduct as jest.Mock).mockImplementationOnce(() => MOCK_PRODUCT);

		const mockEvent: ValidatedAPIGatewayProxyEvent<typeof schema> = {
			body: MOCK_PRODUCT,
		} as any;

		const result = await createProductHandler(mockEvent);

		expect(result.statusCode).toEqual(201);
		expect(JSON.parse(result.body)).toEqual(MOCK_PRODUCT);
	});
});

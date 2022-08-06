import { schema } from './schema';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { updateProduct } from '../../services/products/updateProduct';
import { updateProductHandler } from './handler';

jest.mock('../../services/products/updateProduct');

const MOCK_PRODUCT = {
	id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
	title: 'Ferrari',
	description: 'Fast sport car',
	price: 200000,
	count: 1,
};

describe('updateProductHandler', () => {
	it('should return correct successful response ', async () => {
		(updateProduct as jest.Mock).mockImplementationOnce(() => MOCK_PRODUCT);

		const mockEvent: ValidatedAPIGatewayProxyEvent<typeof schema> = {
			body: MOCK_PRODUCT,
		} as any;

		const result = await updateProductHandler(mockEvent);

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.body)).toEqual(MOCK_PRODUCT);
	});
});

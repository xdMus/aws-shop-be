import { createProductHandler } from './handler';
import { schema } from './schema';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { createProduct } from '../../services/products/createProduct';
import { validateByType } from '../../utils/validators';

jest.mock('../../services/products/createProduct');
jest.mock('../../utils/validators');

describe('createProductHandler', () => {
	it('should return correct successful response ', async () => {
		(createProduct as jest.Mock).mockImplementationOnce(() => undefined);
		(validateByType as jest.Mock).mockImplementationOnce(() =>
			jest.requireActual('../../utils/validators'),
		);
		const mockEvent: ValidatedAPIGatewayProxyEvent<typeof schema> = {
			body: {
				title: 'Ferrari',
				description: 'Fast sport car',
				price: 200000,
				count: 1,
			},
		} as any;

		const result = await createProductHandler(mockEvent);

		expect(result.statusCode).toEqual(201);
	});

	it('should return correct validation error response', async () => {
		(createProduct as jest.Mock).mockImplementationOnce(() => undefined);
		(validateByType as jest.Mock).mockImplementationOnce(() => ['Wrong some param type']);

		const mockEvent: ValidatedAPIGatewayProxyEvent<typeof schema> = {
			body: {
				title: 'Ferrari',
				description: 'Fast sport car',
				price: '200000',
				count: '1',
			},
		} as any;

		const result = await createProductHandler(mockEvent);

		expect(result.statusCode).toEqual(400);
		expect(JSON.parse(result.body).error.message).toEqual('Validation: Wrong some param type');
	});
});

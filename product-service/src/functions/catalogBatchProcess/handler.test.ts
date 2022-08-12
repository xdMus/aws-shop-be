import { createProduct } from '../../services/products/createProduct';
import { catalogBatchProcessHandler } from './handler';
import { publishRequest } from '../../services/sns/publishRequest';
import { HTTPError } from '../../errors/http-error.class';

jest.mock('../../services/products/createProduct');
jest.mock('../../services/sns/publishRequest');

const MOCK_EVENT = {
	Records: [
		{
			body: '[{"title":"Small","count":"1","description":"asfasfa","price":"5"},{"title":"Big","count":"10","description":"big product","price":"1005"}]',
		},
	],
};

describe('catalogBatchProcessHandler', () => {
	it('should return correct successful response ', async () => {
		(createProduct as jest.Mock).mockImplementationOnce(() => null);
		(publishRequest as jest.Mock).mockImplementationOnce(() => null);

		const result = await catalogBatchProcessHandler(MOCK_EVENT as any);

		expect(result.statusCode).toEqual(201);
	});

	it('should return correct error response ', async () => {
		(createProduct as jest.Mock).mockImplementationOnce(() => {
			throw new HTTPError(400, 'Wrong format', 'Validation');
		});
		(publishRequest as jest.Mock).mockImplementationOnce(() => null);

		const result = await catalogBatchProcessHandler(MOCK_EVENT as any);

		expect(result.statusCode).toEqual(400);
		expect(JSON.parse(result.body).error.message).toEqual('Service: Wrong format');
	});
});

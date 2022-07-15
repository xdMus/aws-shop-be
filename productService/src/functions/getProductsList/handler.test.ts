import { mockProductList } from '../../mockProductList';
import { getProductListHandler } from './handler';
import { getProductsList } from '../../services/products/getProductsList';

jest.mock('../../services/products/getProductsList');

const MOCK_RESULT = [mockProductList[0], mockProductList[1]];

describe('getProductListHandler', () => {
	it('should return correct successful response', async () => {
		(getProductsList as jest.Mock).mockImplementationOnce(() => MOCK_RESULT);

		const result = await getProductListHandler();

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.body)).toEqual(MOCK_RESULT);
	});
});

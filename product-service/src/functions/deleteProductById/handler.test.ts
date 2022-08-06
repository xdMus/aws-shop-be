import { deleteProductByIdHandler } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { deleteProductById } from '../../services/products/deleteProductById';
import { mockProductList } from '../../mockProductList';
import { getProductById } from '../../services/products/getProductById';
import { validateProductId } from '../../utils/validators';

jest.mock('../../services/products/deleteProductById');
jest.mock('../../services/products/getProductById');
jest.mock('../../utils/validators');

describe('deleteProductByIdHandler', () => {
	it('should return correct successful response', async () => {
		(deleteProductById as jest.Mock).mockImplementationOnce(() => undefined);
		(getProductById as jest.Mock).mockImplementationOnce(() => mockProductList[0]);
		(validateProductId as jest.Mock).mockImplementationOnce(() => null);

		const mockEvent: APIGatewayProxyEvent = {
			pathParameters: {
				productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
			},
		} as any;

		const result = await deleteProductByIdHandler(mockEvent);

		expect(result.statusCode).toEqual(204);
	});

	it('should return correct response if product id is not correct', async () => {
		(deleteProductById as jest.Mock).mockImplementationOnce(() => undefined);
		(validateProductId as jest.Mock).mockImplementationOnce(() => 'Wrong id');

		const mockEvent: APIGatewayProxyEvent = {
			pathParameters: {
				productId: '1234',
			},
		} as any;

		const result = await deleteProductByIdHandler(mockEvent);

		expect(result.statusCode).toEqual(400);
		expect(JSON.parse(result.body).error.message).toEqual('Validation: Wrong id');
	});
});

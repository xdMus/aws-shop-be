import { getProductByIdHandler } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getProductById } from '../../services/products/getProductById';
import { mockProductList } from '../../mockProductList';

jest.mock('../../services/products/getProductById');

describe('getProductByIdHandler', () => {
	it('should return correct successful response', async () => {
		(getProductById as jest.Mock).mockImplementationOnce(() => mockProductList[0]);

		const mockEvent: APIGatewayProxyEvent = {
			pathParameters: {
				productId: '1234',
			},
		} as any;

		const result = await getProductByIdHandler(mockEvent);

		expect(result.statusCode).toEqual(200);
		expect(JSON.parse(result.body)).toEqual(mockProductList[0]);
	});

	it('should return correct response if product id is not correct', async () => {
		(getProductById as jest.Mock).mockImplementationOnce(() => undefined);

		const mockEvent: APIGatewayProxyEvent = {
			pathParameters: {},
		} as any;

		const result = await getProductByIdHandler(mockEvent);

		expect(result.statusCode).toEqual(400);
		expect(JSON.parse(result.body).error.message).toEqual('Product id is not correct');
	});

	it('should return correct response if product was not found', async () => {
		(getProductById as jest.Mock).mockImplementationOnce(() => undefined);

		const mockEvent: APIGatewayProxyEvent = {
			pathParameters: {
				productId: '1234',
			},
		} as any;

		const result = await getProductByIdHandler(mockEvent);

		expect(result.statusCode).toEqual(404);
		expect(JSON.parse(result.body).error.message).toEqual('Product not found');
	});
});

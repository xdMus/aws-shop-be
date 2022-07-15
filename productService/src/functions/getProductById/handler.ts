import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '../../utils/lambda';
import { getProductById } from '../../services/products/getProductById';
import { HTTPError } from '../../errors/http-error.class';

export const getProductByIdHandler = async ({
	pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const { productId } = pathParameters;

		if (!productId) {
			throw new HTTPError(400, 'Product id is not correct');
		}

		const product = await getProductById(productId);

		if (!product) {
			throw new HTTPError(404, 'Product not found');
		}

		return formatJSONResponse({ ...product });
	} catch (e) {
		if (e instanceof HTTPError) {
			return formatErrorResponse(e.statusCode, e.message);
		}

		return formatErrorResponse(500, e.message);
	}
};

export const main = middyfy(getProductByIdHandler);

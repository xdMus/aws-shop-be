import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '../../utils/lambda';
import { getProductById } from '../../services/products/getProductById';
import { HTTPError } from '../../errors/http-error.class';
import { validateProductId } from '../../utils/validators';

export const getProductByIdHandler = async ({
	pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const { productId } = pathParameters;
		const error = validateProductId(productId, 'Product id is not correct');

		if (error) {
			return formatErrorResponse(new HTTPError(400, error, 'Validation'));
		}

		try {
			const product = await getProductById(productId);

			if (!product) {
				return formatErrorResponse(new HTTPError(404, 'Product not found', 'Database'));
			}

			return formatJSONResponse(200, product);
		} catch (e) {
			return formatErrorResponse(new HTTPError(400, e.message, 'Service'));
		}
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(getProductByIdHandler);

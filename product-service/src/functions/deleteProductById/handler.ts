import { formatBasicCustomResponse, formatErrorResponse } from '../../utils/responseFormatters';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '../../utils/lambda';
import { HTTPError } from '../../errors/http-error.class';
import { validateProductId } from '../../utils/validators';
import { deleteProductById } from '../../services/products/deleteProductById';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';

export const deleteProductByIdHandler = async ({
	pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyStructuredResultV2> => {
	try {
		const { productId } = pathParameters;
		const error = validateProductId(productId, 'Product id is not correct');

		if (error) {
			return formatErrorResponse(new HTTPError(400, error, 'Validation'));
		}

		try {
			await deleteProductById(productId);
		} catch (e) {
			return formatErrorResponse(new HTTPError(400, e.message, 'Service'));
		}

		return formatBasicCustomResponse(204);
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(deleteProductByIdHandler);

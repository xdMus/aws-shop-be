import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';
import { middyfy } from '../../utils/lambda';
import { Product } from '../../models/Product';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { schema } from './schema';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { HTTPError } from '../../errors/http-error.class';
import { updateProduct } from '../../services/products/updateProduct';

export const updateProductHandler = async ({
	body,
}: ValidatedAPIGatewayProxyEvent<typeof schema>): Promise<APIGatewayProxyStructuredResultV2> => {
	try {
		const productDto: Product = body;

		try {
			const updatedProduct = await updateProduct(productDto);

			if (!updatedProduct) {
				return formatErrorResponse(new HTTPError(404, 'Product does not exist', 'Service'));
			}
			return formatJSONResponse(200, updatedProduct);
		} catch (e) {
			return formatErrorResponse(new HTTPError(400, e.message, 'Service'));
		}
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(updateProductHandler);

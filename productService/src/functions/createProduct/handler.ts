import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';
import { middyfy } from '../../utils/lambda';
import { createProduct } from '../../services/products/createProduct';
import { ProductDto } from '../../models/Product';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { schema } from './schema';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { HTTPError } from '../../errors/http-error.class';

export const createProductHandler = async ({
	body,
}: ValidatedAPIGatewayProxyEvent<typeof schema>): Promise<APIGatewayProxyStructuredResultV2> => {
	try {
		const productDto: ProductDto = body;

		try {
			const createdProduct = await createProduct(productDto);
			return formatJSONResponse(201, createdProduct);
		} catch (e) {
			return formatErrorResponse(new HTTPError(400, e.message, 'Service'));
		}
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(createProductHandler);

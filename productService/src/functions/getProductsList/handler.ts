import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';
import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '../../utils/lambda';
import { getProductsList } from '../../services/products/getProductsList';
import { HTTPError } from '../../errors/http-error.class';

export const getProductListHandler = async (): Promise<APIGatewayProxyResult> => {
	try {
		const productsList = await getProductsList();
		return formatJSONResponse(productsList);
	} catch (e) {
		if (e instanceof HTTPError) {
			return formatErrorResponse(e.statusCode, e.message);
		}

		return formatErrorResponse(500, `Failed to get products: ${e.message}`);
	}
};

export const main = middyfy(getProductListHandler);

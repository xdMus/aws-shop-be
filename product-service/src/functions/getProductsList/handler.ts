import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';
import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '../../utils/lambda';
import { getProductsList } from '../../services/products/getProductsList';
import { HTTPError } from '../../errors/http-error.class';

export const getProductListHandler = async (): Promise<APIGatewayProxyResult> => {
	try {
		try {
			const productsList = await getProductsList();

			if (!productsList) {
				return formatErrorResponse(new HTTPError(404, 'Products not found', 'Database'));
			}

			return formatJSONResponse(200, productsList);
		} catch (e) {
			return formatErrorResponse(new HTTPError(400, e.message, 'Service'));
		}
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(getProductListHandler);

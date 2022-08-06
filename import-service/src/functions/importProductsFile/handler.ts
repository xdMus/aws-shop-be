import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { middyfy } from '../../utils/lambda';
import { HTTPError } from '../../errors/http-error.class';
import { schema } from './schema';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { getSignedUrl } from '../../services/getSignedUrl';
import { formatErrorResponse, formatJSONResponse } from '../../utils/responseFormatters';

export const importProductsFileHandler = async ({
	queryStringParameters,
}: ValidatedAPIGatewayProxyEvent<typeof schema>): Promise<APIGatewayProxyStructuredResultV2> => {
	try {
		const { name } = queryStringParameters;
		try {
			const signedUrl = await getSignedUrl(name);

			return formatJSONResponse(200, signedUrl);
		} catch (e) {
			return formatErrorResponse(new HTTPError(400, e.message, 'Service'));
		}
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(importProductsFileHandler);

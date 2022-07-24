import { formatErrorResponse, formatOkResponse } from '../../utils/responseFormatters';
import { middyfy } from '../../utils/lambda';
import { createProduct } from '../../services/products/createProduct';
import { ProductDto } from '../../models/Product';
import { ValidatedAPIGatewayProxyEvent } from '../../common/types';
import { schema } from './schema';
import { validateByType } from '../../utils/validators';
import { HTTPError } from '../../errors/http-error.class';
import { createProductValidationSchema } from '../../utils/validationSchemas';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';

export const createProductHandler = async ({
	body,
}: ValidatedAPIGatewayProxyEvent<typeof schema>): Promise<APIGatewayProxyStructuredResultV2> => {
	try {
		const productDto: ProductDto = body;
		const validationSchema = createProductValidationSchema(productDto);
		const errors = validateByType(validationSchema);

		if (errors.length) {
			return formatErrorResponse(new HTTPError(400, errors.join(', '), 'Validation'));
		}

		await createProduct(productDto);

		return formatOkResponse();
	} catch (e) {
		return formatErrorResponse(e);
	}
};

export const main = middyfy(createProductHandler);

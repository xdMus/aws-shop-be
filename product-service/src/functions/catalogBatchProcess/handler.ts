import { SQSEvent } from 'aws-lambda';
import { middyfy } from '../../utils/lambda';
import { HTTPError } from '../../errors/http-error.class';
import { createProduct } from '../../services/products/createProduct';
import { publishRequest } from '../../services/sns/publishRequest';
import { productSchema } from '../../utils/validators';
import { Logger } from '../../libs/logger/Logger';
import { formatBasicCustomResponse, formatErrorResponse } from '../../utils/responseFormatters';
import { formatProductsList } from '../../utils/bodyFormatters';
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';

const logger = new Logger('SNS handler');
const SUBJECT = 'New Created Products';

export const catalogBatchProcessHandler = async ({
	Records,
}: SQSEvent): Promise<APIGatewayProxyStructuredResultV2> => {
	try {
		try {
			const products = formatProductsList(Records);

			for (const product of products) {
				await productSchema.validateAsync(product);
				await createProduct(product);
			}

			const maxPrice = Math.max(...products.map((product) => product.price));

			await publishRequest(products, SUBJECT, {
				price: {
					DataType: 'Number',
					StringValue: maxPrice.toString(),
				},
			});

			return formatBasicCustomResponse(201);
		} catch (error) {
			logger.error(error.message);

			return formatErrorResponse(new HTTPError(400, error.message, 'Service'));
		}
	} catch (error) {
		logger.error(error.message);
		return formatErrorResponse(error);
	}
};

export const main = middyfy(catalogBatchProcessHandler);

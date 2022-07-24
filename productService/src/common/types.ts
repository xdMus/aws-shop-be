import type { APIGatewayProxyEvent } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
	body: FromSchema<S>;
};

export type PrimitiveType = 'string' | 'number' | 'boolean';

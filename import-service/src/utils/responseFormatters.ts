import { HTTPError } from '../errors/http-error.class';

const headers = {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
};

export const formatBasicCustomResponse = (statusCode: number) => {
	return {
		statusCode,
		headers,
	};
};

export const formatJSONResponse = (statusCode: number, response: unknown) => {
	return {
		statusCode,
		headers,
		body: JSON.stringify(response),
	};
};

export const formatErrorResponse = (error: HTTPError | Error) => {
	let message;
	let statusCode = 500;

	if (error instanceof HTTPError) {
		statusCode = error.statusCode;
		message = `${error.context}: ${error.message}`;
	} else {
		message = error.message;
	}

	return {
		statusCode,
		headers,
		body: JSON.stringify({
			error: {
				message,
			},
		}),
	};
};

import { HTTPError } from '../errors/http-error.class';

const headers = {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
};

export const formatOkResponse = () => {
	return {
		statusCode: 201,
		headers,
	};
};

export const formatJSONResponse = (response: unknown) => {
	return {
		statusCode: 200,
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

const headers = {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
};

export const formatJSONResponse = (response: unknown) => {
	return {
		statusCode: 200,
		headers,
		body: JSON.stringify(response),
	};
};

export const formatErrorResponse = (statusCode: number, message: string) => {
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

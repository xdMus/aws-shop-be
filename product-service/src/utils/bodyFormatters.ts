import { SQSRecord } from 'aws-lambda';
import { ProductDto } from '../models/Product';

export const formatProductsList = (records: SQSRecord[]): ProductDto[] => {
	const result = [];

	for (const record of records) {
		const products = JSON.parse(record.body);

		for (const product of products) {
			result.push(product);
		}
	}

	return result;
};

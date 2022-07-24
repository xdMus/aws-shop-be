import { Product } from '../../models/Product';
import { Logger } from '../../libs/logger/Logger';
import { PostgresDataSource } from '../../repositories/PostgresDataSource';

const logger = new Logger('getProductById service');
const queryText = `SELECT id, count, title, description, price FROM products LEFT JOIN stocks ON id=product_id WHERE id=$1`;

export const getProductById = async (productId: string): Promise<Product | undefined> => {
	const dataSource = new PostgresDataSource();

	return await dataSource.makeRequest(async () => {
		logger.log(`Executing "SELECT" from 'products', 'stocks' tables with id ${productId}`);

		const { rows } = await dataSource.query<Product>(queryText, [productId]);

		return rows[0];
	});
};

import { Product } from '../../models/Product';
import { Logger } from '../../libs/logger/Logger';
import { PostgresDataSource } from '../../repositories/PostgresDataSource';

const logger = new Logger('getProductList service');
const queryText = `SELECT id, count, title, description, price FROM products LEFT JOIN stocks ON id=product_id`;

export const getProductsList = async (): Promise<Product[] | null> => {
	const dataSource = new PostgresDataSource();

	return await dataSource.makeRequest(async () => {
		logger.log(`Executing "SELECT" from 'products', 'stocks' tables`);

		const { rows } = await dataSource.query<Product>(queryText);

		return rows;
	});
};

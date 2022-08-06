import { Product } from '../../models/Product';
import { PostgresDataSource } from '../../repositories/PostgresDataSource';
import { Logger } from '../../libs/logger/Logger';

const logger = new Logger('DeleteProductById service');
const queryText = `DELETE from products where id = $1`;

export const deleteProductById = async (productId: string): Promise<void> => {
	const dataSource = new PostgresDataSource();

	return await dataSource.makeTransaction(async () => {
		logger.log(`Executing "DELETE" from 'products', 'stocks' tables with id ${productId}`);

		await dataSource.query<Product>(queryText, [productId]);
	});
};

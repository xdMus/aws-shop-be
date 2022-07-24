import { Product } from '../../models/Product';
import { PostgresDataSource } from '../../repositories/PostgresDataSource';
import { Logger } from '../../libs/logger/Logger';

const updateProductsQuery = `UPDATE products SET title=$2, description=$3, price=$4 WHERE id=$1 RETURNING id`;
const updateStocksQuery = `UPDATE stocks SET count=$2 WHERE product_id=$1`;

const logger = new Logger('updateProduct Service');

export const updateProduct = async ({
	id,
	title,
	description,
	price,
	count,
}: Product): Promise<Product | null> => {
	const dataSource = new PostgresDataSource();

	return await dataSource.makeTransaction(async () => {
		logger.log(
			`Executing "UPDATE" table "products" with values [title=${title}, description=${description}, price=${price}] with id=${id}`,
		);
		const { rows } = await dataSource.query<{ id: string | null }>(updateProductsQuery, [
			id,
			title,
			description,
			price,
		]);

		if (!rows[0]?.id) {
			return null;
		}

		logger.log(
			`Executing "UPDATE" table "stocks" with values [count=${count}] where product_id=${id}`,
		);
		await dataSource.query(updateStocksQuery, [id, count]);

		return { id, title, description, price, count };
	});
};

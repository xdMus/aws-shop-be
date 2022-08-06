import { Product, ProductDto } from '../../models/Product';
import { PostgresDataSource } from '../../repositories/PostgresDataSource';
import { Logger } from '../../libs/logger/Logger';

const insertIntoProductsQuery = `INSERT INTO products(title, description, price) values($1, $2, $3) RETURNING id`;
const insertIntoStocksQuery = `INSERT INTO stocks(product_id, count) SELECT $1, $2`;

const logger = new Logger('createProduct Service');

export const createProduct = async ({
	title,
	description,
	price,
	count,
}: ProductDto): Promise<Product> => {
	const dataSource = new PostgresDataSource();

	return await dataSource.makeTransaction(async () => {
		logger.log(
			`Executing "INSERT" into "products" table values [title = ${title}, description = ${description}, price = ${price}]`,
		);
		const { rows } = await dataSource.query<{ id: string }>(insertIntoProductsQuery, [
			title,
			description,
			price,
		]);
		const id = rows[0].id;

		logger.log(`Executing "INSERT" into "stocks" table values [count = ${count}]`);
		await dataSource.query(insertIntoStocksQuery, [id, count]);

		return { id, title, description, price, count };
	});
};

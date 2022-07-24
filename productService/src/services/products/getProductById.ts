import { Product } from '../../models/Product';
import { selectProductParams } from './products.constants';
import { DMLOperatorsEnum } from '../../common/constants';
import { Client } from 'pg';
import { pgOptions } from '../../configs/pg.config';

export const getProductById = async (productId: string): Promise<Product | undefined> => {
	const client = new Client(pgOptions);
	const queryText = `${DMLOperatorsEnum.SELECT} ${selectProductParams} from products left join stocks on id = product_id where id = $1`;
	const values = [productId];

	try {
		await client.connect();
		console.log(
			`Executing ${DMLOperatorsEnum.SELECT} from 'products', 'stocks' tables with id ${productId}`,
		);

		const { rows: products } = await client.query<Product>(queryText, values);

		if (!products[0]) {
			return null;
		}

		return products[0];
	} finally {
		await client.end();
	}
};

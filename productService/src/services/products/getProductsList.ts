import { Product } from '../../models/Product';
import { selectProductParams } from './products.constants';
import { DMLOperatorsEnum } from '../../common/constants';
import { Client } from 'pg';
import { pgOptions } from '../../configs/pg.config';

export const getProductsList = async (): Promise<Product[] | null> => {
	const client = new Client(pgOptions);
	const queryText = `${DMLOperatorsEnum.SELECT} ${selectProductParams} from products
	 left join stocks on id = product_id`;

	try {
		await client.connect();
		console.log(`Executing ${DMLOperatorsEnum.SELECT} from 'products', 'stocks' tables`);

		const { rows: products } = await client.query<Product>(queryText);

		if (!products?.length) {
			return null;
		}

		return products;
	} finally {
		await client.end();
	}
};

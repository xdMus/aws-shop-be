import { Product } from '../../models/Product';
import { Client } from 'pg';
import { pgOptions } from '../../configs/pg.config';
import { DMLOperatorsEnum } from '../../common/constants';

export const deleteProductById = async (productId: string): Promise<void> => {
	const client = new Client(pgOptions);
	const queryText = `${DMLOperatorsEnum.DELETE} from products where id = $1`;
	const values = [productId];

	try {
		await client.connect();
		console.log(
			`Executing "${DMLOperatorsEnum.DELETE}" from 'products', 'stocks' tables with id ${productId}`,
		);

		await client.query<Product>(queryText, values);
	} finally {
		await client.end();
	}
};

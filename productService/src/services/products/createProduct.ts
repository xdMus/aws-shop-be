import { ProductDto } from '../../models/Product';
import { insertProductParams, insertStockParams } from './products.constants';
import { DMLOperatorsEnum } from '../../common/constants';
import { Client } from 'pg';
import { pgOptions } from '../../configs/pg.config';

export const createProduct = async ({ title, description, price, count }: ProductDto) => {
	const client = new Client(pgOptions);
	const queryText = `
			with new_product as (${DMLOperatorsEnum.INSERT} 
			into products (${insertProductParams}) 
			values($1, $2, $3) returning id) 
			insert into stocks (${insertStockParams})
			${DMLOperatorsEnum.SELECT} id, $4
			from new_product;`;
	const values = [title, description, price, count];

	try {
		await client.connect();

		console.log(
			`Executing ${DMLOperatorsEnum.INSERT} to 'products', 'stocks' tables values 
			"${values[0]}", "${values[1]}", "${values[2]}", "${values[3]}"`,
		);
		await client.query(queryText, values);
	} finally {
		await client.end();
	}
};

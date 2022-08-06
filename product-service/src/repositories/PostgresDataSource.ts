import { Client, QueryConfig } from 'pg';
import { pgOptions } from '../configs/pg.config';

export class PostgresDataSource {
	private client: Client;

	constructor() {
		this.client = new Client(pgOptions);
	}

	async query<ResponseType>(query: string | QueryConfig<any[]>, values?: any[]) {
		return this.client.query<ResponseType>(query, values);
	}

	async makeRequest<ResponseType>(callback: () => ResponseType) {
		let response: ResponseType;

		try {
			await this.client.connect();
			response = await callback();
		} finally {
			await this.client.end();
		}

		return response;
	}

	async makeTransaction<ResponseType>(callback: () => ResponseType) {
		return this.makeRequest(async () => {
			let result: ResponseType;

			try {
				await this.client.query('BEGIN');
				result = await callback();
				await this.client.query('COMMIT');
			} catch (error) {
				await this.client.query('ROLLBACK');
				throw error;
			}

			return result;
		});
	}
}

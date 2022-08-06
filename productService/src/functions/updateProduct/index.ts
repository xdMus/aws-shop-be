import { handlerPath } from '../../utils/handler-resolver';
import { schema } from './schema';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'put',
				path: 'products',
				cors: true,
				request: {
					schemas: {
						'application/json': schema,
					},
				},
			},
		},
	],
};

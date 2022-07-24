export const schema = {
	type: 'object',
	properties: {
		id: { type: 'string', format: 'uuid' },
		title: { type: 'string', minLength: 1 },
		description: { type: 'string', minLength: 1 },
		price: { type: 'number' },
		count: { type: 'number' },
	},
	required: ['id', 'title', 'description', 'price', 'count'],
};

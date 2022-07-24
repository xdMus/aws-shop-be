export const schema = {
	type: 'object',
	properties: {
		title: { type: 'string', minLength: 1 },
		description: { type: 'string', minLength: 1 },
		price: { type: 'number' },
		count: { type: 'number' },
	},
	required: ['title', 'description', 'price', 'count'],
};

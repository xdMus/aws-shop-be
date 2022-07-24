import { ValidationInput } from './validators';
import { ProductDto } from '../models/Product';

export const createProductValidationSchema = (productDto: ProductDto): ValidationInput[] => [
	{
		validationType: 'string',
		value: productDto.title,
		validationMessage: 'Title must be a string',
	},
	{
		validationType: 'string',
		value: productDto.description,
		validationMessage: 'Description must be a string',
	},
	{
		validationType: 'number',
		value: productDto.price,
		validationMessage: 'Price must be a string',
	},
	{
		validationType: 'number',
		value: productDto.count,
		validationMessage: 'Count must be a string',
	},
];

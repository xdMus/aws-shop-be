import validator from 'validator';
import Joi from 'joi';

const { isUUID } = validator;

export const validateProductId = (productId: string, validationMessage: string) =>
	isUUID(productId) ? null : validationMessage;

export const productSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	price: Joi.number().positive().required(),
	count: Joi.number().min(0).required(),
});

import validator from 'validator';

const { isUUID } = validator;

export const validateProductId = (productId: string, validationMessage: string) =>
	isUUID(productId) ? null : validationMessage;

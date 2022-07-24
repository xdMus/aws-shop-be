import { PrimitiveType } from '../common/types';
import validator from 'validator';

const { isUUID } = validator;

export interface ValidationInput {
	validationType: PrimitiveType;
	value: unknown;
	validationMessage: string;
}

export const validateByType = (schemas: ValidationInput[]) =>
	schemas.reduce(
		(errors, { validationType, value, validationMessage }) =>
			typeof value === validationType ? errors : [...errors, validationMessage],
		[],
	);

export const validateProductId = (productId: string, validationMessage: string) =>
	isUUID(productId) ? null : validationMessage;

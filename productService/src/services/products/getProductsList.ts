import { Product } from '../../models/Product';
import { mockProductList } from '../../mockProductList';

export const getProductsList = async (): Promise<Product[]> => {
	return mockProductList;
};

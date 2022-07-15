import { mockProductList } from '../../mockProductList';
import { Product } from '../../models/Product';

export const getProductById = async (productId: string): Promise<Product | undefined> => {
	return mockProductList.find((product) => product.id === productId);
};

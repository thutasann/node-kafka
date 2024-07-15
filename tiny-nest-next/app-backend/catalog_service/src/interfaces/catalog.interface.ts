import { Product } from '../models/product.model';

export interface ICatalogRepository {
	create(data: Product): Promise<Product>;
	update(data: Product): Promise<Product>;
	delete(id: string): any;
	find(limit: number, offset: number): Promise<Product[]>;
	findOne(id: string): Promise<Product>;
}

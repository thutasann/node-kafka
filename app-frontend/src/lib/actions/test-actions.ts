'use server';

import { IProduct } from '@/dto/IProduct';
import { CATALOG_SERVICE } from '../api';

export async function fetchTest(): Promise<{ message: string }> {
	console.log('CATALOG_SERVICE', CATALOG_SERVICE);
	const res = await fetch(CATALOG_SERVICE + '/example', { cache: 'no-store' });
	return await res.json();
}

export async function getProducts(): Promise<IProduct[]> {
	const response = await fetch(CATALOG_SERVICE + '/products');
	return await response.json();
}

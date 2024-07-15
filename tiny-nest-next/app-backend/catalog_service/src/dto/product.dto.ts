import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductRequest {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	description: string;

	@IsNumber()
	@Min(1)
	price: number;

	@IsNumber()
	stock: number;
}

export class UpdateProductRequest {
	name?: string;

	description?: string;

	@IsNumber()
	@Min(1)
	price?: number;

	@IsNumber()
	@Min(1)
	stock?: number;
}

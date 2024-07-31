import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { userTypes } from 'src/shared/schema/user.schema';

/** Create User Dto */
export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	@IsIn([userTypes.ADMIN, userTypes.CUSTOMER])
	type: string;

	@IsString()
	@IsOptional()
	secretToken?: string;

	isVerified?: boolean;
}

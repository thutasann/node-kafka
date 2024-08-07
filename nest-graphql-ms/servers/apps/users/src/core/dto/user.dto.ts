import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Register Dto
 */
@InputType()
export class RegisterDto {
	@Field()
	@IsNotEmpty({ message: 'Name is Requried' })
	@IsString({ message: 'Name must need to be one string' })
	name: string;

	@Field()
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Email is invalid' })
	email: string;

	@Field()
	@IsNotEmpty({ message: 'password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	password: string;

	@Field()
	@IsNotEmpty({ message: 'Phone number is required' })
	phone_number: number;
}

/**
 * Login Dto
 */
@InputType()
export class LoginDto {
	@Field()
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Email is invalid' })
	email: string;

	@Field()
	@IsNotEmpty({ message: 'password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	password: string;
}

/**
 * User Activation Dto
 */
@InputType()
export class ActivationDto {
	@Field()
	@IsNotEmpty({ message: 'Activation Token is required' })
	activationToken: string;

	@Field()
	@IsNotEmpty({ message: 'Activation Code is required' })
	activationCode: string;
}

/**
 * Forgot Password Dto
 * */
@InputType()
export class ForgotPasswordDto {
	@Field()
	@IsNotEmpty({ message: 'Email is required!' })
	@IsEmail({}, { message: 'Email must be valid.' })
	email: string;
}

@InputType()
export class ResetPasswordDto {
	@Field()
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	password: string;

	@Field()
	@IsNotEmpty({ message: 'Activation Token is required.' })
	activationToken: string;
}

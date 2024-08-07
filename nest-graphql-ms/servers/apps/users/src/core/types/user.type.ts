import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

/**
 * Error Type
 */
@ObjectType()
export class ErrorType {
	@Field()
	message: string;

	@Field({ nullable: true })
	code?: string;
}

/**
 * Register Response
 */
@ObjectType()
export class RegisterResponse {
	@Field()
	activation_token: string;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

/**
 * Login Response
 */
@ObjectType()
export class LoginResponse {
	@Field(() => User)
	user: User;

	@Field({ nullable: true })
	accessToken?: string;

	@Field({ nullable: true })
	refreshToken?: string;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

@ObjectType()
export class LogoutResponse {
	@Field()
	message: string;
}

/**
 * User Activation Response
 */
@ObjectType()
export class ActivationResponse {
	@Field(() => User)
	user: User | unknown;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

/**
 * Forgot Password Respones
 */
@ObjectType()
export class ForgotPasswordResponse {
	@Field()
	message: string;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

@ObjectType()
export class ResetPasswordResponse {
	@Field(() => User)
	user: User | unknown;

	@Field(() => ErrorType, { nullable: true })
	error?: ErrorType;
}

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
	ActivationResponse,
	LoginResponse,
	RegisterResponse,
} from './types/user.type';
import { ActivationDto, RegisterDto } from './dto/user.dto';
import type { Response } from 'express';
import { BadRequestException, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
	private readonly logger = new Logger(UserResolver.name);

	constructor(private readonly userService: UsersService) {}

	@Mutation(() => RegisterResponse)
	async register(
		@Args('registerInput') registerDto: RegisterDto,
		@Context() context: { res: Response },
	): Promise<RegisterResponse> {
		if (!registerDto.name || !registerDto.email || !registerDto.password) {
			throw new BadRequestException('Invalid Request');
		}

		const { activation_token } = await this.userService.register(
			registerDto,
			context.res,
		);
		this.logger.debug(`activation_token  : ${activation_token}`);
		return { activation_token };
	}

	@Mutation(() => ActivationResponse)
	async activateUser(
		@Args('activationInput') activationDto: ActivationDto,
		@Context() context: { res: Response },
	): Promise<ActivationResponse> {
		return await this.userService.activateUser(activationDto, context.res);
	}

	@Mutation(() => LoginResponse)
	async Login(
		@Args('email') email: string,
		@Args('password') password: string,
	): Promise<LoginResponse> {
		return await this.userService.login({ email, password });
	}

	@Query(() => [User])
	async getUsers() {
		return this.userService.getUsers();
	}
}

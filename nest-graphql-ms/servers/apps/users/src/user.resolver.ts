import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RegisterResponse } from './types/user.type';
import { RegisterDto } from './dto/user.dto';
import type { Response } from 'express';
import { BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
	constructor(private readonly userService: UsersService) {}

	@Mutation(() => RegisterResponse)
	async register(
		@Args('registerInput') registerDto: RegisterDto,
	): Promise<RegisterResponse> {
		if (!registerDto.name || !registerDto.email || !registerDto.password) {
			throw new BadRequestException('Invalid Request');
		}

		const user = await this.userService.register(registerDto);
		return { user };
	}

	@Query(() => [User])
	async getUsers() {
		return this.userService.getUsers();
	}
}

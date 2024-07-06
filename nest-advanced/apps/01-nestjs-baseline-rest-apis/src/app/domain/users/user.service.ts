import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './user.dto';
import { ApiMockType } from './user.module';

@Injectable()
export class UserService {
	constructor(
		/** testing purpose */
		@Inject('TEST_API_TOKEN') private token: ApiMockType,
		@InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>,
	) {}

	async fetchUsers(): Promise<UsersEntity[]> {
		console.log('mock_token -> ', this.token.data);
		return await this.usersRepo.find({});
	}

	async createUser(body: CreateUserDto) {
		return await this.usersRepo.save(body);
	}
}
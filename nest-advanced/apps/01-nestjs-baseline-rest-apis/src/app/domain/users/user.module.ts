import { AppLoggerModule } from '@dev/logger';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDaoService } from './user.dao.service';
import { AuthModule } from '../auth/auth.module';

//? -------- testing purpose start
export interface ApiMockType {
	data: string[];
}
export const apiMock: ApiMockType = {
	data: ['this ', 'is ', 'api ', 'mock '],
};
//? -------- testing purpose end

/**
 * User Module
 */
@Module({
	imports: [
		AppLoggerModule,
		forwardRef(() => AuthModule),
		TypeOrmModule.forFeature([UsersEntity]),
	],
	controllers: [UserController],
	providers: [
		UserService,
		{
			provide: 'TEST_API_TOKEN', // testing purpose
			useValue: apiMock,
		},
		{
			provide: UserDaoService, // testing purpose
			useClass: UserDaoService,
		},
	],
	exports: [UserService],
})
export class UserModule {}

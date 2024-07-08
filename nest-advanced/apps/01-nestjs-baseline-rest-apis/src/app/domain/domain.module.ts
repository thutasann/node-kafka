import { DBModule } from '@dev/database';
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { UsersEntity } from './users/user.entity';
import { UserModule } from './users/user.module';
import { AppLoggerMiddleware } from '../core/middleware/app-log.middleware';
import { RouteInfo } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../core/middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from '@dev/email';
import { ConfigModule, ConfigService } from '@dev/config';
import { HttpClientModule } from '@dev/http';
import { AppLoggerModule } from '@dev/logger';

/** Global Prefix */
export const GLOBAL_PREFIX = '/api/v1';

/**
 * Domain Module 🚀
 * @description
 * - useClass - to get a private instance of the options provider
 * - useFactory - to use a function as the options provider
 * - useExisting - to re-use an existing (shared, SINGLETON) service as the options provider
 */
@Module({
	imports: [
		HttpClientModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				apiUrl: config.get().externalApi.apiUrl,
				apiKey: config.get().externalApi.apiKey,
			}),
		}),
		EmailModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					service: config.get().email.service_name,
					user: config.get().email.username,
					pass: config.get().email.password,
				};
			},
		}),
		DBModule.forRoot({
			entities: [UsersEntity],
		}),
		AppLoggerModule,
		AuthModule,
		UserModule,
	],
	providers: [],
	controllers: [],
})
export class DomainModoule implements NestModule {
	public authRoutes: Array<RouteInfo> = [
		{
			path: '*',
			method: RequestMethod.ALL,
		},
	];

	public publicRoutes: Array<RouteInfo> = [
		{
			path: `${GLOBAL_PREFIX}/health`,
			method: RequestMethod.GET,
		},
	];

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.exclude(...this.publicRoutes)
			.forRoutes(...this.authRoutes);

		consumer.apply(AppLoggerMiddleware).forRoutes('*');
	}
}

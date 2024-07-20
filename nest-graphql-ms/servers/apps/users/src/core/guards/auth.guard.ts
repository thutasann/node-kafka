import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly config: ConfigService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const gqlContext = GqlExecutionContext.create(context);
		const { req } = gqlContext.getContext();

		const accessToken = req.headers.accesstoken as string;
		const refreshtoken = req.headers.refreshtoken as string;

		if (!accessToken || !refreshtoken) {
			throw new UnauthorizedException('Please login to access this resource!');
		}

		if (accessToken) {
			const decoded = this.jwtService.verify(accessToken, {
				secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
			});

			if (!decoded) {
				throw new UnauthorizedException('Invalid access token!');
			}

			await this.updateAccessToken(req);
		}

		return true;
	}

	/** update acccess token */
	private async updateAccessToken(req: any): Promise<void> {
		try {
			/** refresh token from header */
			const refreshTokenData = req.headers.refreshtoken as string;

			/** decoded refresh token */
			const decoded = this.jwtService.verify(refreshTokenData, {
				secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
			});

			if (!decoded) {
				throw new UnauthorizedException(
					'Please login to access this resource!',
				);
			}

			/** logined user */
			const user = await this.prisma.user.findUnique({
				where: {
					id: decoded.id,
				},
			});

			/** new acess token */
			const accessToken = this.jwtService.sign(
				{ id: user.id },
				{
					secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
					expiresIn: '15m',
				},
			);

			/** refresh token */
			const refreshtoken = this.jwtService.sign(
				{ id: user.id },
				{
					secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
					expiresIn: '15m',
				},
			);

			req.accessToken = accessToken;
			req.refreshtoken = refreshtoken;
			req.user = user;
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		/** roles -> ['admin', 'user'] */
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		console.log('roles', roles);

		if (roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const requestRoles = request.user?.roles; // 'admin'
		return roles.includes(requestRoles);
	}
}

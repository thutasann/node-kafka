import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';
import * as basicAuth from 'express-basic-auth';

/**
 * create an OpenAPI document for an applicationm, via swagger.
 * @param app - the nestjs application
 * @returns the openAPI document
 */
export function createDocument(app: INestApplication) {
	const builder = new DocumentBuilder()
		.setTitle(SWAGGER_CONFIG.title)
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			'authoirzation',
		)
		.setDescription(SWAGGER_CONFIG.description)
		.setVersion(SWAGGER_CONFIG.version);

	for (const tag of SWAGGER_CONFIG.tags) {
		builder.addTag(tag);
	}

	const options = builder.build();

	app.use(
		'/docs',
		basicAuth({
			challenge: true,
			users: {
				user: 'test123',
			},
		}),
	);
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('docs', app, document);
}

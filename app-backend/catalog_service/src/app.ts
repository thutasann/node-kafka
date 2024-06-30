import express from 'express';
import setupSwagger from './swagger';
import catalogRouter from './routes/catalog.route';
import welcomeRouter from './routes/welcome.route';
import { httpLogger } from './utils/logger';
import { HandleErrorWithLogger } from './utils/error/handler';

export const CATALOG_PREFIX = '/api/v1/catalog';

const app = express();

// swagger setup
setupSwagger(app);

app.use(express.json());
app.use(httpLogger);

app.use(HandleErrorWithLogger);

// routes
app.use(CATALOG_PREFIX, welcomeRouter);
app.use(CATALOG_PREFIX, catalogRouter);

export default app;

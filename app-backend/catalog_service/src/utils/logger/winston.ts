import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}]: ${message}`;
});

const winstonLogger = createLogger({
	level: 'info',
	format: combine(timestamp(), logFormat),
	transports: [
		new transports.File({ filename: 'error.log', level: 'error ' }),
		new transports.File({ filename: 'combined.log' }),
	],
});

winstonLogger.add(
	new transports.Console({
		format: format.simple(),
	}),
);

export default winstonLogger;

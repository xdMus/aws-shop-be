import { LoggerType } from './logger.interface';

export class Logger implements LoggerType {
	public context;

	constructor(context) {
		this.context = context;
	}

	log(message: string) {
		console.log(this.context + ': ' + message);
	}

	error(message: string) {
		console.error(this.context + ': ' + message);
	}
}

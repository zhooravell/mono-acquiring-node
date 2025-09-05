import {MonoAcquiringError} from "./mono-acquiring.error";

export class BadRequestError extends MonoAcquiringError {
    constructor(message: string = 'Bad request', public readonly code: string = '') {
        super(message);
        this.name = 'BadRequestError';
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
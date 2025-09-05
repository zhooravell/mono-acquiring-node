import {MonoAcquiringError} from "./mono-acquiring.error";

export class TooManyRequestsError extends MonoAcquiringError {
    constructor(message: string = 'Too many requests. Please try again later.', public readonly code: string = '') {
        super(message);
        this.name = 'TooManyRequestsError';
        Object.setPrototypeOf(this, TooManyRequestsError.prototype);
    }
}
import {MonoAcquiringError} from "./mono-acquiring.error";

export class BaseUrlError extends MonoAcquiringError {
    constructor(message: string = 'Invalid URL format') {
        super(message);
        this.name = 'BaseUrlError';
        Object.setPrototypeOf(this, BaseUrlError.prototype);
    }
}
import {MonoAcquiringError} from "./mono-acquiring.error";

export class APIKeyError extends MonoAcquiringError {
    constructor(message: string = 'API key is required') {
        super(message);
        this.name = 'APIKeyError';
        Object.setPrototypeOf(this, APIKeyError.prototype);
    }
}
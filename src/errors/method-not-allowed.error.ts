import {MonoAcquiringError} from "./mono-acquiring.error";

export class MethodNotAllowedError extends MonoAcquiringError {
    constructor(message: string = 'Method not allowed.', public readonly code: string = '') {
        super(message);
        this.name = 'MethodNotAllowedError';
        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
    }
}
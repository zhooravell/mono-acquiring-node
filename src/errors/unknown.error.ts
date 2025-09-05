import {MonoAcquiringError} from "./mono-acquiring.error";

export class UnknownError extends MonoAcquiringError {
    constructor(message: string = 'Unknown error', public readonly code: string = '') {
        super(message);
        this.name = 'UnknownError';
        Object.setPrototypeOf(this, UnknownError.prototype);
    }
}
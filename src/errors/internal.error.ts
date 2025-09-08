import {MonoAcquiringError} from "./mono-acquiring.error";

export class InternalError extends MonoAcquiringError {
    constructor(message: string = 'Internal error', public readonly code: string = '') {
        super(message);
        this.name = 'InternalError';
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
import {MonoAcquiringError} from "./mono-acquiring.error";

export class NotFoundError extends MonoAcquiringError {
    constructor(message: string = 'Not found', public readonly code: string = '') {
        super(message);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
import {MonoAcquiringError} from "./mono-acquiring.error";

export class ForbiddenError extends MonoAcquiringError {
    constructor(message: string = 'Forbidden', public readonly code: string = '') {
        super(message);
        this.name = 'ForbiddenError';
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
export class ValidationError extends Error {
    constructor(
        message: string,
        public readonly errors: Record<string, any>
    ) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

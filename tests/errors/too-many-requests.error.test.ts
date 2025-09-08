import {TooManyRequestsError} from "../../src";

describe('TooManyRequestsError', () => {
    it('default arguments', () => {
        const error = new TooManyRequestsError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Too many requests');
        // @ts-ignore
        expect(error.code).toBe('');
        // @ts-ignore
        expect(error.name).toBe('TooManyRequestsError');
    });
});
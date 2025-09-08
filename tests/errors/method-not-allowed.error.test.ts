import {MethodNotAllowedError} from "../../src";

describe('MethodNotAllowedError', () => {
    it('default arguments', () => {
        const error = new MethodNotAllowedError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Method not allowed');
        // @ts-ignore
        expect(error.code).toBe('');
        // @ts-ignore
        expect(error.name).toBe('MethodNotAllowedError');
    });
});
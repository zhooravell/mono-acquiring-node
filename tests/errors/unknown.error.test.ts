import {UnknownError} from "../../src";

describe('UnknownError', () => {
    it('default arguments', () => {
        const error = new UnknownError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Unknown error');
        // @ts-ignore
        expect(error.code).toBe('');
        // @ts-ignore
        expect(error.name).toBe('UnknownError');
    });
});
import {InternalError} from "../../src";

describe('InternalError', () => {
    it('default arguments', () => {
        const error = new InternalError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Internal error');
        // @ts-ignore
        expect(error.code).toBe('');
        // @ts-ignore
        expect(error.name).toBe('InternalError');
    });
});
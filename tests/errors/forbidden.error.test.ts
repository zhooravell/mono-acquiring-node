import {ForbiddenError} from "../../src";

describe('ForbiddenError', () => {
    it('default arguments', () => {
        const error = new ForbiddenError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Forbidden');
        // @ts-ignore
        expect(error.code).toBe('');
        // @ts-ignore
        expect(error.name).toBe('ForbiddenError');
    });
});
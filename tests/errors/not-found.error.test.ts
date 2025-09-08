import {NotFoundError} from "../../src";

describe('NotFoundError', () => {
    it('default arguments', () => {
        const error = new NotFoundError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Not found');
        // @ts-ignore
        expect(error.code).toBe('');
        // @ts-ignore
        expect(error.name).toBe('NotFoundError');
    });
});
import {BaseUrlError} from "../../src";

describe('BaseUrlError', () => {
    it('default arguments', () => {
        const error = new BaseUrlError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Invalid URL format');
        // @ts-ignore
        expect(error.name).toBe('BaseUrlError');
    });
});
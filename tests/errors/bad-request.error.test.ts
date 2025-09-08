import {BadRequestError} from "../../src";

describe('BadRequestError', () => {
    it('default arguments', () => {
        const error = new BadRequestError();

        expect(error).toBeDefined();
        // @ts-ignore
        expect(error.message).toBe('Bad request');
        // @ts-ignore
        expect(error.code).toBe('');
        // @ts-ignore
        expect(error.name).toBe('BadRequestError');
    });
});
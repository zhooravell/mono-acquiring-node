import {APIKeyError, BaseUrlError, Config} from "../../src";

describe('Client config', () => {
    it('all arguments', () => {
        const apiKey = 'api-key';
        const baseUrl = 'https://monobank.ua/api/';
        const cms = 'cms';
        const cmsVersion = 'cms-version';

        const config = new Config(apiKey, baseUrl, cms, cmsVersion);

        expect(config).toBeDefined();

        expect(config.getApiKey()).toEqual(apiKey);
        expect(config.getBaseUrl()).toEqual('https://monobank.ua/api');
        expect(config.getCms()).toEqual(cms);
        expect(config.getCmsVersion()).toEqual(cmsVersion);
    });

    it('default values', () => {
        const apiKey = 'api-key';
        const config = new Config(apiKey);

        expect(config).toBeDefined();

        expect(config.getApiKey()).toEqual(apiKey);
        expect(config.getBaseUrl()).toEqual('https://api.monobank.ua');
        expect(config.getCms()).toEqual('nodejs');
        expect(config.getCmsVersion()).toEqual(process.version.replace('v', ''));
    });

    it('empty api key', () => {
        try {
            new Config('');
            fail('Expected Config constructor to throw APIKeyError');
        } catch (error) {
            expect(error).toBeInstanceOf(APIKeyError);
            // @ts-ignore
            expect(error.message).toBe('API key is required');
        }
    });

    it('invalid base url', () => {
        try {
            new Config('api-key', '1--test');
            fail('Expected Config constructor to throw BaseUrlError');
        } catch (error) {
            expect(error).toBeInstanceOf(BaseUrlError);
            // @ts-ignore
            expect(error.message).toBe('Invalid baseUrl: must be a valid URL');
        }
    });
});
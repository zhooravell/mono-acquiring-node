import {Client, Config, HttpClient, RemoveWalletCardRequest, UnknownError} from "../../src";
import {ValidationError} from "../../src/errors/validation.error";
// @ts-ignore
import {errorsTestCases} from "./errors.test-cases";

describe('Client removeWalletCard', () => {
    const API_KEY = 'test-api-key';

    let config: Config;

    beforeEach(() => {
        jest.clearAllMocks();
        config = new Config(API_KEY, 'https://api.test.com/', 'test-cms', '1.0.0');
    });

    it('remove wallet card with empty card token', async () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({ data: 'test data' }),
        };

        const client = new Client(mockHttpClient, config);
        const invalidRequest = {} as RemoveWalletCardRequest;

        await expect(client.removeWalletCard(invalidRequest))
            .rejects
            .toThrow(ValidationError);
    });

    it('remove wallet card with valid card token', async () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({
                status: 200,
                headers: {},
                data: {}
            }),
        };

        const client = new Client(mockHttpClient, config);

        await client.removeWalletCard({
            cardToken: '1234567890'
        });

        expect(mockHttpClient.request).toHaveBeenCalledWith({
            method: 'DELETE',
            url: 'https://api.test.com/api/merchant/wallet/card',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Token': API_KEY,
                'X-Cms': 'test-cms',
                'X-Cms-Version': '1.0.0',
            },
            params: {
                cardToken: '1234567890'
            }
        });
    });

    test.each(errorsTestCases)('http error codes', async (
        status,
        errCode,
        errText,
        ErrorClass,
        errorName
    ) => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({
                status: status,
                headers: {},
                data: {
                    "errCode": errCode,
                    "errText":errText
                }
            }),
        };

        const client = new Client(mockHttpClient, config);

        try {
            await client.removeWalletCard({
                cardToken: '1234567890'
            });
            fail('Expected to throw Error');
        } catch (error) {
            expect(error).toBeInstanceOf(ErrorClass);
            // @ts-ignore
            expect(error.message).toBe(errText);
            // @ts-ignore
            expect(error.code).toBe(errCode);
            // @ts-ignore
            expect(error.name).toBe(errorName);
        }
    });

    it('unknown error', async () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({
                status: 502,
                headers: {},
                data: {}
            }),
        };

        const client = new Client(mockHttpClient, config);

        try {
            await client.removeWalletCard({
                cardToken: '1234567890'
            });
            fail('Expected to throw Error');
        } catch (error) {
            expect(error).toBeInstanceOf(UnknownError);
            // @ts-ignore
            expect(error.message).toBe('unknown');
            // @ts-ignore
            expect(error.code).toBe('unknown');
            // @ts-ignore
            expect(error.name).toBe('UnknownError');
        }
    });
});
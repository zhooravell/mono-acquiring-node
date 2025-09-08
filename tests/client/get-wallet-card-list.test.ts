import {Client, Config, GetWalletCardListRequest, HttpClient} from "../../src";
import {ValidationError} from "../../src/errors/validation.error";
// @ts-ignore
import {errorsTestCases} from "./errors.test-cases";

describe('Client getWalletCardList', () => {
    const API_KEY = 'test-api-key';

    let config: Config;

    beforeEach(() => {
        jest.clearAllMocks();
        config = new Config(API_KEY, 'https://api.test.com/', 'test-cms', '1.0.0');
    });

    it('get wallet card list with empty wallet id', async () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({ data: 'test data' }),
        };

        const client = new Client(mockHttpClient, config);
        const invalidRequest = {} as GetWalletCardListRequest;

        await expect(client.getWalletCardList(invalidRequest))
            .rejects
            .toThrow(ValidationError);
    });

    it('get wallet card list with valid wallet id', async () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({
                status: 200,
                headers: {},
                data: {
                    wallet: [
                        { cardToken: '67XZtXdR4NpKU3', maskedPan: '424242******4242', country: '804' },
                        { cardToken: '67XZtXdR4NpKU4', maskedPan: '424242******4241', country: '804' }
                    ]
                }
            }),
        };

        const client = new Client(mockHttpClient, config);
        const result = await client.getWalletCardList({
            walletId: '1234567890'
        });

        expect(mockHttpClient.request).toHaveBeenCalledWith({
            method: 'GET',
            url: 'https://api.test.com/api/merchant/wallet',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Token': API_KEY,
                'X-Cms': 'test-cms',
                'X-Cms-Version': '1.0.0',
            },
            params: {
                walletId: '1234567890'
            }
        });

        expect(result).toEqual({
            wallet: [
                { cardToken: '67XZtXdR4NpKU3', maskedPan: '424242******4242', country: '804' },
                { cardToken: '67XZtXdR4NpKU4', maskedPan: '424242******4241', country: '804' }
            ]
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
            await client.getWalletCardList({
                walletId: '1234567890'
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
});
import {Client, Config, GetWalletCardListRequest, HttpClient, RemoveWalletCardRequest} from '../../src';
import {ValidationError} from "../../src/errors/validation.error";

describe('Client', () => {
    const API_KEY = 'test-api-key';

    let config: Config;

    beforeEach(() => {
        jest.clearAllMocks();
        config = new Config(
            API_KEY,
            'https://api.test.com/',
            'test-cms',
            '1.0.0',
        );
    });

    it('should be defined', () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({ data: 'test data' }),
        };

        const client = new Client(mockHttpClient, config);

        expect(client).toBeDefined();
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
        const invalidRequest: GetWalletCardListRequest = {
            walletId: '1234567890'
        }

        const result = await client.getWalletCardList(invalidRequest);

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
});
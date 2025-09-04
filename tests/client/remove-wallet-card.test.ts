import {Client, Config, HttpClient, RemoveWalletCardRequest} from "../../src";
import {ValidationError} from "../../src/errors/validation.error";

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
        const invalidRequest: RemoveWalletCardRequest = {
            cardToken: '1234567890'
        }

        await client.removeWalletCard(invalidRequest);

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
});
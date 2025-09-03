import {Client, Config, HttpClient} from '../../src';

describe('Client', () => {
    it('should be defined', () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({ data: 'test data' }),
        };

        const client = new Client(mockHttpClient, new Config('api-key'));
        expect(client).toBeDefined();
    });

    // Додайте більше тестів
});
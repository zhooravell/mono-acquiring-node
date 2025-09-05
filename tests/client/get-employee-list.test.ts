import {Client, Config, HttpClient} from "../../src";

describe('Client getEmployeeList', () => {
    const API_KEY = 'test-api-key';

    let config: Config;

    beforeEach(() => {
        jest.clearAllMocks();
        config = new Config(API_KEY, 'https://api.test.com/', 'test-cms', '1.0.0');
    });

    it('get employee list', async () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({
                status: 200,
                headers: {},
                data: {
                    "list": [
                        {
                            "id": "3QFX7e7mZfo3R",
                            "name": "Артур Дент",
                            "extRef": "abra_kadabra"
                        }
                    ]
                }
            }),
        };

        const client = new Client(mockHttpClient, config);

        await client.getEmployeeList();

        expect(mockHttpClient.request).toHaveBeenCalledWith({
            method: 'GET',
            url: 'https://api.test.com/api/merchant/employee/list',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Token': API_KEY,
                'X-Cms': 'test-cms',
                'X-Cms-Version': '1.0.0',
            },
        });
    });
});
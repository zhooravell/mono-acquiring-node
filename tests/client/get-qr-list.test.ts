import {Client, Config, HttpClient} from "../../src";
// @ts-ignore
import {errorsTestCases} from "./errors.test-cases";

describe('Client getQRList', () => {
    const API_KEY = 'test-api-key';

    let config: Config;

    beforeEach(() => {
        jest.clearAllMocks();
        config = new Config(API_KEY, 'https://api.test.com/', 'test-cms', '1.0.0');
    });

    it('get qr list', async () => {
        const mockHttpClient: HttpClient = {
            request: jest.fn().mockResolvedValue({
                status: 200,
                headers: {},
                data: {
                    "list": [
                        {
                            "shortQrId": "OBJE",
                            "qrId": "XJ_DiM4rTd5V",
                            "amountType": "merchant",
                            "pageUrl": "https://pay.mbnk.biz/XJ_DiM4rTd5V"
                        }
                    ]
                }
            }),
        };

        const client = new Client(mockHttpClient, config);

        const result = await client.getQRList();

        expect(mockHttpClient.request).toHaveBeenCalledWith({
            method: 'GET',
            url: 'https://api.test.com/api/merchant/qr/list',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Token': API_KEY,
                'X-Cms': 'test-cms',
                'X-Cms-Version': '1.0.0',
            },
        });

        expect(result).toEqual({
            list: [
                {
                    shortQrId: 'OBJE',
                    qrId: 'XJ_DiM4rTd5V',
                    amountType: 'merchant',
                    pageUrl: 'https://pay.mbnk.biz/XJ_DiM4rTd5V'
                }
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
            await client.getQRList();
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
//
// https://monobank.ua/api-docs/acquiring
//

import {HttpClient, HttpRequest, HttpResponse} from "../interfaces/http-client";
import {GetWalletCardListResponse} from "../models/responses/get-wallet-card-list.response";
import {
    GetWalletCardListRequest,
    GetWalletCardListRequestSchema
} from "../models/requests/get-wallet-card-list.request";
import {Config} from "./config";
import {Validator} from "../utils/validator";
import {RemoveWalletCardRequest, RemoveWalletCardRequestSchema} from "../models/requests/remove-wallet-card.request";
import {GetEmployeeListResponse} from "../models/responses/get-employee-list.response";
import {BadRequestError} from "../errors/bad-request.error";
import {ForbiddenError} from "../errors/forbidden.error";
import {NotFoundError} from "../errors/not-found.error";
import {TooManyRequestsError} from "../errors/too-many-requests.error";
import {InternalError} from "../errors/internal.error";
import {MethodNotAllowedError} from "../errors/method-not-allowed.error";
import {UnknownError} from "../errors/unknown.error";
import {GetQRListResponse} from "../models/responses/get-qr-list.response";

export class Client {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly config: Config,
    ) {
    }

    public async getWalletCardList(request: GetWalletCardListRequest): Promise<GetWalletCardListResponse> {
        Validator.validate(GetWalletCardListRequestSchema, request);

        const response: HttpResponse<GetWalletCardListResponse> = await this.doRequest({
            method: 'GET',
            url: this.config.getBaseUrl() + '/api/merchant/wallet',
            headers: this.getHeaders(),
            params: {
                walletId: request.walletId,
            }
        })

        return response.data
    }

    public async removeWalletCard(request: RemoveWalletCardRequest): Promise<void> {
        Validator.validate(RemoveWalletCardRequestSchema, request);

        await this.doRequest({
            method: 'DELETE',
            url: this.config.getBaseUrl() + '/api/merchant/wallet/card',
            headers: this.getHeaders(),
            params: {
                cardToken: request.cardToken
            }
        })
    }

    public async getEmployeeList(): Promise<GetEmployeeListResponse> {
        const response: HttpResponse<GetEmployeeListResponse> = await this.doRequest({
            method: 'GET',
            url: this.config.getBaseUrl() + '/api/merchant/employee/list',
            headers: this.getHeaders(),
        })

        return response.data
    }

    public async getQRList(): Promise<GetQRListResponse> {
        const response: HttpResponse<GetQRListResponse> = await this.doRequest({
            method: 'GET',
            url: this.config.getBaseUrl() + '/api/merchant/qr/list',
            headers: this.getHeaders(),
        })

        return response.data
    }

    private getHeaders(): Record<string, string> {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Token': this.config.getApiKey(),
            'X-Cms': this.config.getCms(),
            'X-Cms-Version': this.config.getCmsVersion(),
        }
    }

    private async doRequest(request: HttpRequest): Promise<HttpResponse<any>> {
        const response: HttpResponse<any> = await this.httpClient.request(request)

        if (response.status === 200) {
            return response;
        }

        const errCode: string = response.data?.errCode || 'unknown';
        const errText: string = response.data?.errText || 'unknown';

        switch (response.status) {
            case 400:
                throw new BadRequestError(errText, errCode);
            case 403:
                throw new ForbiddenError(errText, errCode);
            case 404:
                throw new NotFoundError(errText, errCode);
            case 429:
                throw new TooManyRequestsError(errText, errCode);
            case 500:
                throw new InternalError(errText, errCode);
            case 405:
                throw new MethodNotAllowedError(errText, errCode);
            default:
                throw new UnknownError(errText, errCode);
        }
    }
}


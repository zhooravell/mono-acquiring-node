import {HttpClient, HttpResponse} from "../interfaces/http-client";
import {GetWalletCardListResponse} from "../models/responses/get-wallet-card-list.response";
import {
    GetWalletCardListRequest,
    GetWalletCardListRequestSchema
} from "../models/requests/get-wallet-card-list.request";
import {Config} from "./config";
import {Validator} from "../utils/validator";
import {RemoveWalletCardRequest, RemoveWalletCardRequestSchema} from "../models/requests/remove-wallet-card.request";

export class Client {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly config: Config,
    ) {
    }

    public async getWalletCardList(request: GetWalletCardListRequest): Promise<GetWalletCardListResponse> {
        Validator.validate(GetWalletCardListRequestSchema, request);

        const response: HttpResponse<GetWalletCardListResponse> = await this.httpClient.request({
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

        await this.httpClient.request({
            method: 'DELETE',
            url: this.config.getBaseUrl() + '/api/merchant/wallet/card',
            headers: this.getHeaders(),
            params: {
                cardToken: request.cardToken
            }
        });

        return;
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
}


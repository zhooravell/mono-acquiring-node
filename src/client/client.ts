import {HttpClient, HttpResponse} from "../interfaces/http-client";
import {GetWalletCardListResponse} from "../models/responses/get-wallet-card-list.response";
import {GetWalletCardListRequest} from "../models/requests/get-wallet-card-list.request";
import {Config} from "./config";

export class Client {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly config: Config,
    ) {
    }

    async getWalletCardList(request: GetWalletCardListRequest): Promise<GetWalletCardListResponse> {
        const url = ``
        const response: HttpResponse<GetWalletCardListResponse> = await this.httpClient.request({
            method: 'GET',
            url: url,
        })

        return response.data
    }
}


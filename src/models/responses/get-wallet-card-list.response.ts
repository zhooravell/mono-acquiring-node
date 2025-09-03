//
// https://monobank.ua/api-docs/acquiring/dodatkova-funktsionalnist/tokenizatsiia/get--api--merchant--wallet
//

export interface WalletCard {
    cardToken: string;
    maskedPan: string;
    country: string;
}

export interface GetWalletCardListResponse {
    wallet: WalletCard[];
}

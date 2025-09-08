//
// https://monobank.ua/api-docs/acquiring/metody/qr-ekvairynh/get--api--merchant--qr--list
//

export interface QRListItem {
    shortQrId: string;
    qrId: string;
    pageUrl: string;
    amountType: string;
}

export interface GetQRListResponse {
    list: QRListItem[];
}
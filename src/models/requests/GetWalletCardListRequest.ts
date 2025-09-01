//
// https://monobank.ua/api-docs/acquiring/dodatkova-funktsionalnist/tokenizatsiia/get--api--merchant--wallet
//

import { z } from "zod";

export const GetWalletCardListRequestSchema = z.object({
    walletId: z.string()
});

export type GetWalletCardListRequest = z.infer<typeof GetWalletCardListRequestSchema>;

//
// https://monobank.ua/api-docs/acquiring/dodatkova-funktsionalnist/tokenizatsiia/delete--api--merchant--wallet--card
//

import { z } from "zod";

export const RemoveWalletCardRequestSchema = z.object({
    cardToken: z.string()
});

export type RemoveWalletCardRequest = z.infer<typeof RemoveWalletCardRequestSchema>;
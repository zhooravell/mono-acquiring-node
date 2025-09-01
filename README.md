Monobank Acquiring Node SDK
============================

## Supported API Methods

| Description                             | HTTP Method | Endpoint                                                    | Function |
|-----------------------------------------|-------------|-------------------------------------------------------------|----------|
| Створення рахунку                       | POST        | `/api/merchant/invoice/create`                              |          |
| Статус рахунку                          | GET         | `/api/merchant/invoice/status?invoiceId={invoiceId}`        |          |
| Скасування оплати                       | POST        | `/api/merchant/invoice/cancel`                              |          |
| Інвалідація рахунку                     | POST        | `/api/merchant/invoice/remove`                              |          |
| Відкритий ключ                          | GET         | `/api/merchant/pubkey`                                      |          |
| Фіналізація суми холду                  | POST        | `/api/merchant/invoice/finalize`                            |          |
| Інформація про QR-касу                  | GET         | `/api/merchant/qr/details?qrId={qrId}`                      |          |
| Видалення суми оплати QR                | POST        | `/api/merchant/qr/reset-amount`                             |          |
| Список QR-кас                           | GET         | `/api/merchant/qr/list`                                     |          | 
| Дані мерчанта                           | GET         | `/api/merchant/details`                                     |          |
| Виписка за період                       | GET         | `/api/merchant/statement`                                   |          |
| Видалення токенізованої картки          | DELETE      | `/api/merchant/wallet/card`                                 |          |
| Список карток у гаманці                 | GET         | `/api/merchant/wallet`                                      |          |
| Оплата по токену                        | POST        | `/api/merchant/wallet/payment`                              |          |
| Оплата за реквізитами                   | POST        | `/api/merchant/invoice/payment-direct`                      |          |
| Список субмерчантів                     | GET         | `/api/merchant/submerchant/list`                            |          |
| Квитанція                               | GET         | `/api/merchant/invoice/receipt?invoiceId={invoiceId}`       |          |
| Фіскальні чеки                          | GET         | `/api/merchant/invoice/fiscal-checks?invoiceId={invoiceId}` |          |
| Синхронна оплата                        | POST        | `/api/merchant/invoice/sync-payment`                        |          |
| Список співробітників                   | GET         | `/api/merchant/employee/list`                               |          |
| Список отримувачів розщеплених платежів | GET         | `/api/merchant/split-receiver/list`                         |          |

## Source(s)

* [Monobank Acquiring](https://monobank.ua/api-docs)
* [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html)
* [ISO 3166-1](https://www.iso.org/iso-3166-country-codes.html)



my-sdk/
├── src/
│ ├── client/ # Клієнт SDK (http-клієнт, базовий transport)
│ │ ├── http-client.ts # Обгортка над fetch/axios
│ │ ├── api-client.ts # Основний клієнт для роботи з API
│ │
│ ├── models/ # DTO-класи (requests/responses)
│ │ ├── requests/
│ │ │ ├── GetUserRequest.ts
│ │ │ └── CreateOrderRequest.ts
│ │ ├── responses/
│ │ │ ├── UserResponse.ts
│ │ │ └── OrderResponse.ts
│ │
│ ├── errors/ # Кастомні помилки SDK
│ │ └── ApiError.ts
│ │
│ ├── index.ts # Вхідна точка SDK (експортує клієнт/DTO)
│ └── utils/ # Допоміжні функції (наприклад, мапінг, логування)
│ └── validation.ts
│
├── tests/ # Тести (unit/integration)
│ ├── client.test.ts
│ └── dto.test.ts
│
├── .dockerignore
├── .gitignore
├── .eslintrc.js # ESLint (статичний аналіз)
├── .prettierrc # Prettier (форматування)
├── docker-compose.yml # Для запуску різних версій Node локально
├── Dockerfile # Docker-образ для dev/test
├── jest.config.js # Налаштування тестів (або vitest.config.ts)
├── package.json
├── tsconfig.json
└── README.md

// src/schemas/user.ts
import { z } from "zod";

// схема валідації
export const UserSchema = z.object({
id: z.string().uuid(),
email: z.string().email(),
createdAt: z.string().datetime(),
});

// інтерфейс (замість класу)
export type User = z.infer<typeof UserSchema>;

// src/schemas/createUser.ts
import { z } from "zod";

// реквест
export const CreateUserRequestSchema = z.object({
email: z.string().email(),
password: z.string().min(6),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

// респонс
export const CreateUserResponseSchema = z.object({
user: z.object({
id: z.string().uuid(),
email: z.string().email(),
}),
token: z.string(),
});

export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;

import { HttpClient } from "./http/client";
import {
CreateUserRequest,
CreateUserRequestSchema,
CreateUserResponse,
CreateUserResponseSchema,
} from "./schemas/createUser";

export class MyApiSdk {
constructor(private client: HttpClient) {}

async createUser(
data: CreateUserRequest
): Promise<CreateUserResponse> {
// перевірка перед відправкою
const validData = CreateUserRequestSchema.parse(data);

    return this.client.post<CreateUserResponse>(
      "/users",
      validData,
      CreateUserResponseSchema
    );

}
}
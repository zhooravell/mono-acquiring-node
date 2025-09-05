//
// https://monobank.ua/api-docs/acquiring/metody/qr-ekvairynh/get--api--merchant--employee--list
//

export interface EmployeeListItem {
    id: string;
    name: string;
    extRef: string;
}

export interface GetEmployeeListResponse {
    list: EmployeeListItem[];
}
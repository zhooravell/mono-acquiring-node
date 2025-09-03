export interface HttpRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, any>;
}

export interface HttpResponse<T> {
    status: number;
    data: T;
    headers: Record<string, string>;
}

export interface HttpClient {
    request<T>(config: HttpRequest): Promise<HttpResponse<T>>;
}
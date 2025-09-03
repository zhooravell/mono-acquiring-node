import { APIKeyError } from '../errors/api-key.error';
import { BaseUrlError } from '../errors/base-url.error';

export class Config {
    private readonly cms: string;
    private readonly cmsVersion: string;
    private readonly baseUrl: string;

    constructor(
        private readonly apiKey: string,
        baseUrl?: string,
        cms?: string,
        cmsVersion?: string,
    ) {
        if (!apiKey || apiKey.trim() === '') {
            throw new APIKeyError();
        }

        const defaultBaseUrl = 'https://api.monobank.ua';

        if (!baseUrl) {
            this.baseUrl = defaultBaseUrl;
        } else {
            try {
                const url = new URL(baseUrl);

                this.baseUrl = url.toString();
            } catch (error) {
                throw new BaseUrlError('Invalid baseUrl: must be a valid URL');
            }
        }

        this.cms = cms || 'nodejs';
        this.cmsVersion = cmsVersion || process.version.replace('v', '');
    }

    getApiKey(): string {
        return this.apiKey;
    }

    getBaseUrl(): string {
        return this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    }

    getCms(): string {
        return this.cms;
    }

    getCmsVersion(): string {
        return this.cmsVersion;
    }
}

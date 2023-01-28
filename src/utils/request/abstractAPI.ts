import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axios from 'axios';

enum ContentType {
    json = "application/json;charset=UTF-8",
    params = "application/x-www-form-urlencoded",
    form = "multipart/form-data"
}
type AxiosResult = {
    data: URLSearchParams,
    status: number
}

abstract class AbstractAPI {
    protected http: AxiosInstance;
    protected readonly url: string;
    protected readonly contentType: string;
    protected constructor(
        protected readonly baseURL: string,
        protected readonly path?: string,
        protected readonly content_type: keyof typeof ContentType = 'params',
    ) {
        this.url = path ? baseURL.concat(path) : baseURL;
        this.contentType = ContentType[content_type];
        this.http = axios.create({
            baseURL: this.url,
            headers: {
                'Content-Type': this.contentType,
            },
        })
    }
    protected createAxios() {
        
    }
    protected paramsSerialized(data: Record<string,string>) {
        if(this.contentType === 'json')
            return data;
        else
            return new URLSearchParams(data);
    }
    protected handleResponse(response: AxiosResponse): AxiosResult {
        const data = new URLSearchParams(response.data);
        const status = response.status;
        return {data, status};
    }
    protected isAxiosError(value: any): value is AxiosError {
        return typeof value?.response === 'object';
    }
    protected handleError(error: unknown): never {
        if(error instanceof Error) {
            if(this.isAxiosError(error)) {
                if(error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    throw error;
                } else if (error.request) {
                    console.log(error.request);
                    throw new Error(error as any);
                }
            } else {
                console.log('Error', error.message);
                throw new Error(error.message);
            }
        }
        throw new Error(error as any);
    }
}

export {AbstractAPI};
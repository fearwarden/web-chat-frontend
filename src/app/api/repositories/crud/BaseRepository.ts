import { AxiosResponse } from "axios";
import { HttpClient } from "@/app/api/http/HttpClient.ts";

export interface IBaseRepository<T> {
    get(id: string | number): Promise<ApiResponse<T>>;
    getMany(): Promise<ApiResponse<T[]>>;
    create(data: T): Promise<ApiResponse<T>>;
    update(id: string | number, data: T): Promise<ApiResponse<T>>;
    delete(id: string | number): Promise<ApiResponse<T>>;
}

export class ApiResponse<T> {
    data?: T;
}

const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
    return new Promise((resolve, reject) => {
        const result: ApiResponse<any> = {
            data: response,
        };
        resolve(result);
    });
};

export abstract class BaseRepository<T> extends HttpClient implements IBaseRepository<T> {
    protected collection: string | undefined;
    protected instance = this.createInstance();

    public async get(id: string): Promise<ApiResponse<T>> {
        const { data } = await this.instance.get(`${this.collection}/${id}`).then(transform);
        return data;
    }
    public async getMany(): Promise<ApiResponse<T[]>> {
        const { data } = await this.instance.get(`${this.collection}`).then(transform);
        return data;
    }
    create(data: T): Promise<ApiResponse<T>> {
        throw new Error("Method not implemented.");
    }
    update(id: string | number, data: T): Promise<ApiResponse<T>> {
        throw new Error("Method not implemented.");
    }
    delete(id: string | number): Promise<ApiResponse<T>> {
        throw new Error("Method not implemented.");
    }
}
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { BASE_URL } from "@/constants/constants.ts";

export abstract class HttpClient {
    protected instance: AxiosInstance | undefined;

    protected createInstance(): AxiosInstance {
        this.instance = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
        return this.instance;
    }

    private initializeRequestInterceptor = () => {

    }

    private initializeResponseInterceptor = () => {
        this.instance?.interceptors.response.use(this.handleResponse, this.handleResponseError);
    }

    private handleResponse = ({ data }: AxiosResponse) => data;
    private handleResponseError = (error: AxiosError) => {
        if (error.response?.status === 406) {
            const originalRequest = error.config;
            try {
                //TODO: call refresh function to send api to the backend
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    };

    private async refreshToken() {
        //TODO: add refresh api
    }
}
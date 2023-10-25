import {HttpClient} from "@/app/api/http/HttpClient.ts";

export class AuthenticationRepository extends HttpClient {
    private collection: string = "/api/v1/auth"
    protected axiosInstance = this.createInstance();

    public async login(email: string, password: string) {
        const result = await this.axiosInstance.post(`${this.collection}/login`, { email, password });
        return result.data;
    }

    public async register(email: string, password: string, username: string) {
        const result = await this.axiosInstance.post(`${this.collection}/register`, {
            email,
            password,
            username
        });
        return result.data;
    }
}
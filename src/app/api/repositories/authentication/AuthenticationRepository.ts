import {HttpClient} from "@/app/api/http/HttpClient.ts";

export class AuthenticationRepository extends HttpClient {
    private collection: string = "/api/v1/auth"

    public async login(email: string, password: string) {
        const instance = this.createInstance();
        const result = await instance.post(`${this.collection}/login`, { email, password });
        return result.data;
    }
}
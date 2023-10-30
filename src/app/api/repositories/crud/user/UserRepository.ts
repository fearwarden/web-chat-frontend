import { BaseRepository } from "@/app/api/repositories/crud/BaseRepository.ts";

export interface IUser {
    id: string;
    email: string;
    username: string;
}

export default class UserRepository extends BaseRepository<IUser> {
    collection = "/api/v1/users";
}
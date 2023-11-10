import {BaseRepository} from "@/app/api/repositories/crud/BaseRepository.ts";

export interface IRoomRepository {
    id: string;
    users: string[];
    messages: Message[];
}

export interface Message {
    roomId: string;
    senderId: string;
    receiverId: string;
    content: string;
    action: UserAction;
    timestamp: Date;
}

export enum UserAction {
    JOINED = "JOINED",
    COMMENTED = "COMMENTED",
    LEFT = "LEFT"
}

export default class RoomRepository extends BaseRepository<IRoomRepository> {
    collection = "/api/v1/rooms"
}
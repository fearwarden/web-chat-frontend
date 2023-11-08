import {IMessage} from "@stomp/stompjs";

export interface ISubscription {
    get topic(): string;
    callback(message: IMessage): void;
}
import {IMessage} from "@stomp/stompjs";

export interface IObserver {
    update: (data: IMessage) => void;
}
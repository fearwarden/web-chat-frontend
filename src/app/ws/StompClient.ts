import {CompatClient, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ObserverManager from "@/app/ws/observers/ObserverManager.ts";
import {MessageDto} from "@/pages/Home/HomePage.tsx";

export default class StompClient extends ObserverManager{
    private _client: CompatClient | null = null;

    constructor() {
        super();
        const socket = new SockJS("/ws");
        this.client = Stomp.over(socket);

        this.client.onConnect = () => {
            console.log("Connection established.")
        }

        this.client.activate();
    }

    public subscribeToTopic(topic: string) {
        if (!this.client) return;
        this.client.subscribe(topic, (message: IMessage) => {
            this.notifyObservers(JSON.parse(message.body));
        })
    }

    public sendMessage(destination: string, message: MessageDto): void {
        if (!this.client) return;
        this.client.publish({ destination, body: JSON.stringify(message) })
    }

    set client(value: CompatClient) {
        this._client = value;
    }
    get client(): CompatClient | null {
        return this._client;
    }
}

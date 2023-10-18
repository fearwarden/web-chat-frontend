import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import AbstractSubscription from "./subscriptions/AbstractSubscription";

export default class StompClient {
  private _stompClient: CompatClient | null = null;
  private _subscriptions: AbstractSubscription[] = [];

  public connect(): void {
    const socket = new SockJS("http://localhost:8080/ws");
    this._stompClient = Stomp.over(socket);

    if (!this._stompClient) {
      throw new Error("Stomp client is not initialized.");
    }

    const subMap = new Map<string, Function[]>();

    // Converts every subscription to map and group by topic
    for (const sub of this._subscriptions) {
      if (subMap.has(sub.topic)) {
        subMap.get(sub.topic)!.push(sub.callback);
      } else {
        subMap.set(sub.topic, [sub.callback]);
      }
    }

    this._stompClient.connect({}, (frame: any) => {
      for (let key of subMap.keys()) {
        this._stompClient!.subscribe(key, (message: any) => {
          for (let callback of subMap.get(key)!) {
            callback(message);
          }
        });
      }
    });
  }

  public disconnect(): void {
    if (this._stompClient) {
      this._stompClient.disconnect();
    }
  }

  public send(endpoint: string, message: any): void {
    if (!this._stompClient) return;
    this._stompClient.send(endpoint, {}, JSON.stringify(message));
  }

  public get stompClient(): CompatClient | null {
    return this._stompClient;
  }

  public set stompClient(value: CompatClient | null) {
    this._stompClient = value;
  }
}

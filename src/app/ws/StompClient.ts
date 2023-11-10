import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SubscriptionManager from "./subscriptions/SubscriptionManager.ts";

export default class StompClient {
  private _stompClient: CompatClient | null = null;
  private _subscriptions: SubscriptionManager | null;

  constructor() {
    this._subscriptions = null;
  }

  public connect(): void {
    const socket = new SockJS("http://localhost:8080/ws");
    this._stompClient = Stomp.over(socket);

    if (!this._stompClient) {
      throw new Error("Stomp client is not initialized.");
    }

    if (!this._subscriptions) {
      this._subscriptions = new SubscriptionManager();
    }

    const subMap = new Map<string, Function[]>();

    // Converts every subscription to map and group by topic
    if (Array.isArray(this._subscriptions.messageSubscription)) {
      for (const sub of this._subscriptions.messageSubscription) { // uzeti listu message subova is sub managera
        if (subMap.has(sub.topic)) {
          subMap.get(sub.topic)!.push(sub.callback);
        } else {
          subMap.set(sub.topic, [sub.callback]);
        }
      }
    }

    this._stompClient.connect({}, (frame: any) => {
      for (const key of subMap.keys()) {
        this._stompClient!.subscribe(key, (message: any) => {
          for (const callback of subMap.get(key)!) {
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
    if (!this.stompClient) {
      console.log("Stomp client nije init u send.")
      return;
    }
    this.stompClient.send(endpoint, {}, JSON.stringify(message));
  }

  public get stompClient(): CompatClient | null {
    return this._stompClient;
  }

  public set stompClient(value: CompatClient | null) {
    this._stompClient = value;
  }
}

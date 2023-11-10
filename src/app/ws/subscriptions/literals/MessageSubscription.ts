import {ISubscription} from "@/app/ws/subscriptions/ISubscription.ts";
import {IMessage} from "@stomp/stompjs";

export default class MessageSubscription implements ISubscription {
  private _topic: string;

  constructor(topic: string = "/app") {
    this._topic = topic;
  }

  callback(message: IMessage): void {
    JSON.parse(message.body);
  }

  get topic(): string {
    return this._topic;
  }

  set topic(value: string) {
    this._topic = value;
  }
}

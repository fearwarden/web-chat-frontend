import {ISubscription} from "@/app/ws/subscriptions/ISubscription.ts";
import {IMessage} from "@stomp/stompjs";

export default class MessageSubscription implements ISubscription {
  private readonly _topic: string;

  constructor(chatRoomId: string) {
    this._topic = `/user/${chatRoomId}`;
  }

  callback(message: IMessage): void {
    console.log(message);
  }

  get topic(): string {
    return this._topic;
  }
}

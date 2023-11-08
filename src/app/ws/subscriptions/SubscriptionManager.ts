import MessageSubscription from "@/app/ws/subscriptions/literals/MessageSubscription.ts";

export default class SubscriptionManager {
  private _messageSubscription: MessageSubscription[];
  
  constructor() {
    this._messageSubscription = [];
  }

  public addMessageSubscription(chatRoodId: string): void {
    const subscription = new MessageSubscription(chatRoodId);
    this.messageSubscription.push(subscription);
  }

  public get messageSubscription(): MessageSubscription[] {
    return this._messageSubscription;
  }

  public set messageSubscription(value: MessageSubscription[]) {
    this._messageSubscription = value;
  }

  public getSubscriptions() {
    return [this.messageSubscription];
  }
}
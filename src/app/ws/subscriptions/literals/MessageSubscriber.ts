import AbstractSubscription from "../AbstractSubscription";

export default class MessageSubscriber extends AbstractSubscription {
  constructor(topic: string, callback: (message: any) => void) {
    super(topic, callback);
  }

  /*private parseMessage(rawMessage: any) {
    try {
      return JSON.parse(rawMessage);
    } catch (error) {
      console.log("Error parsing message:", rawMessage, error);
      return null;
    }
  }*/

  public set callback(value: (message: any) => void) {
    this.callback = (message: any) => {
      value(message);
    };
  }
}

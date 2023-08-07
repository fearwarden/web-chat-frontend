export default abstract class AbstractSubscription {
  private _topic: string;
  private _callback: (message: any) => void;

  constructor(topic: string, callback: (message: any) => void) {
    this._topic = topic;
    this._callback = callback;
  }
}

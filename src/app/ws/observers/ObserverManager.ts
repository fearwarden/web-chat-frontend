import {IObserver} from "@/app/ws/observers/IObserver.ts";
import {IMessage} from "@stomp/stompjs";

export default class ObserverManager {
    private _observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public removeObserver(observer: IObserver) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    protected notifyObservers(message: IMessage) {
        this.observers.forEach(observer => observer.update(message));
    }

    get observers(): IObserver[] {
        return this._observers;
    }

    set observers(value: IObserver[]) {
        this._observers = value;
    }
}
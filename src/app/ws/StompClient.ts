import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";

export default class StompClient {
  private _stompClient: Client;

  constructor() {
    this._stompClient = new Client();
  }
}

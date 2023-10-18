import React, {useEffect, useState} from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import avatar from "./assets/img/avatar.png";
import StompClient from "./app/ws/StompClient";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

function App() {
  const [message, setMessage] = useState<string>("");

  const stompClient = new StompClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      stompClient.send("/app", {
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/public", message => {
        console.log(message)
      });

      stompClient.send("/app/chat.sendMessage", {}, "Test");
    })
  }, []);

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col items-center px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
          <h1 className="text-3xl text-slate-300 mt-4">Web Chat Application</h1>
          <img src={avatar} className="w-full h-auto mt-10" />
          <h2 className="text-2xl text-slate-300 mt-4">Boris Antonijev</h2>
          <h2 className="text-xl text-slate-300 mt-1">
            borisantonijev@gmail.com
          </h2>
        </div>
      </aside>

      <div className="h-screen p-4 sm:ml-96 bg-slate-900">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-start h-16 rounded">
              <img className="w-32 h-auto" src={avatar} alt="" />
            </div>
            <div className="flex items-center justify-center h-16 rounded">
              <h1 className="text-3xl text-slate-300">Some Title</h1>
            </div>
            <div className="flex items-center justify-center h-16 rounded">
              <h1 className="text-3xl text-slate-300">Some Title</h1>
            </div>
          </div>
        </div>
        <div className="p-4 dark:border-gray-700 mt-4 overflow-y-auto" style={{maxHeight: "50rem"}}>
          <div className="flex flex-col gap-4 items-center mb-4 rounded dark:bg-gray-800 h-[44rem]" >
            <ScrollArea className="h-[44rem] w-full rounded-md border">
            </ScrollArea>
            <div className="flex gap-2 w-full justify-center">
              <Input className="w-1/2" type="text" placeholder="message..." />
              <Button variant="secondary">Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

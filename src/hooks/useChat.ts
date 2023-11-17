import StompClient from "@/app/ws/StompClient.ts";
import {useEffect, useState} from "react";
import {IMessage} from "@stomp/stompjs";

const useChat = (stompClient: StompClient | null, topic: string) => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        if (!stompClient) return;
        const observer = {
            update: (msg: IMessage) => {
                setMessages(prevState => [...prevState, msg]);
            }
        }

        stompClient.subscribeToTopic(topic)
        stompClient.addObserver(observer);

        return () => {
            //TODO: unsubscribe in the clean up function
            stompClient.removeObserver(observer);
        }
    }, [stompClient, topic]);

    return messages;
}

export default useChat;
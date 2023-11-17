import {IRoomRepository, UserAction} from "@/app/api/repositories/crud/room/RoomRepository.ts";
import StompClient from "@/app/ws/StompClient.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useRef, useState} from "react";
import {UserState} from "@/store/slices/userSlice.ts";
import {MessageDto} from "@/pages/Home/HomePage.tsx";
import useChat from "@/hooks/useChat.ts";

export interface ChatRoomProps {
    currentRoom: IRoomRepository;
    stompClient: StompClient | null;
    user: UserState;
}

function ChatRoom({ currentRoom, stompClient, user }: ChatRoomProps) {
    const [message, setMessage] = useState<string>("");
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);
    const topic = `/user/${user.id}/private`;
    const chatHook = useChat(stompClient, topic);

    function sendMessage() {
        if (!stompClient || !currentRoom || !message) return;

        const receiverId = currentRoom.users.filter(id => id !== user.id);
        const messageContent: MessageDto = {
            roomId: currentRoom.id,
            senderId: user.id,
            receiverId: receiverId[0], //TODO: AKO budes ubacivao grupe, promeniti tip receiverId jer ce tada biti lista
            content: message,
            action: UserAction.COMMENTED,
            timestamp: Date.now()
        }
        stompClient.sendMessage("/app/private-message", messageContent);
    }
    return (
        <>
            <div className="flex flex-col gap-4 items-center mb-4 rounded dark:bg-gray-800 h-[44rem]">
                <h2 className="text-xl text-slate-300 mt-1">{currentRoom.id}</h2>
                <ScrollArea className="h-[44rem] w-full rounded-md border text-white" ref={scrollAreaRef}>
                </ScrollArea>
                <div className="flex gap-2 w-full justify-center">
                    <Input value={message} className="w-1/2" type="text" placeholder="message..."
                           onChange={(e) => setMessage(e.target.value)}/>
                    <Button variant="secondary" onClick={sendMessage}>Send Message</Button>
                </div>
            </div>
        </>
    )
}

export default ChatRoom;
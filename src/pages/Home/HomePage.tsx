import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area";
import avatar from "../../assets/img/avatar.png";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "@/constants/constants.ts";
import RoomRepository, {IRoomRepository} from "@/app/api/repositories/crud/room/RoomRepository.ts";
import StompClient from "@/app/ws/StompClient.ts";

interface IMessage {
    roomId: string;
    senderId: string;
    receiverId: string;
    content: string;
    action: UserAction;
    timestamp: number;
}

enum UserAction {
    JOINED,
    COMMENTED,
    LEFT
}

function HomePage() {
    const [message, setMessage] = useState<string>("");
    const [stompClient, setStompClient] = useState<StompClient | null>(null);
    const [rooms, setRooms] = useState<IRoomRepository[]>([]);
    const user = useSelector((state: RootState) => state.users);
    const navigate = useNavigate();
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    if (!user.id) {
        navigate(LOGIN);
    }

    async function fetchData() {
        const roomRepo = new RoomRepository();
        const data = await roomRepo.getMany();
        setRooms(data.data!);
    }

    function sendMessage() {
        if (!stompClient) return;
        const mes: IMessage = {
            roomId: rooms[0].id,
            senderId: rooms[0].users[0],
            receiverId: rooms[0].users[1],
            content: message,
            action: UserAction.COMMENTED,
            timestamp: Date.now()
        }
        stompClient.send("/app/private-message", mes);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const client = new StompClient();
        client.connect();
        setStompClient(client);
    }, []);

    return (
        <div>
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div
                    className="h-full flex flex-col items-center px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
                    <h1 className="text-3xl text-slate-300 mt-4">Web Chat Application</h1>
                    <img src={avatar} className="w-full h-auto mt-10" alt="avatar"/>
                    <h2 className="text-2xl text-slate-300 mt-4">{user.username}</h2>
                    <h2 className="text-xl text-slate-300 mt-1">
                        {user.email}
                    </h2>
                    {rooms.length > 0 &&
                        rooms.map((room, index) => {
                            return (
                                <div key={index}>
                                    <p className="text-2xl text-slate-300 mt-4">{room.id}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </aside>

            <div className="h-screen p-4 sm:ml-96 bg-slate-900">
                <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center justify-start h-16 rounded">
                            <img className="w-32 h-auto" src={avatar} alt=""/>
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
                    <div className="flex flex-col gap-4 items-center mb-4 rounded dark:bg-gray-800 h-[44rem]">
                        <ScrollArea className="h-[44rem] w-full rounded-md border" ref={scrollAreaRef}>
                        </ScrollArea>
                        <div className="flex gap-2 w-full justify-center">
                            <Input className="w-1/2" type="text" placeholder="message..."
                                   onChange={(e) => setMessage(e.target.value)}/>
                            <Button variant="secondary" onClick={sendMessage}>Send Message</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

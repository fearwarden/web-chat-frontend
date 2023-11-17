import {useEffect, useState} from "react";
import avatar from "../../assets/img/avatar.png";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import {useNavigate} from "react-router-dom";
import {LOGIN} from "@/constants/constants.ts";
import RoomRepository, {IRoomRepository} from "@/app/api/repositories/crud/room/RoomRepository.ts";
import StompClient from "@/app/ws/StompClient.ts";
import ChatRoom from "@/pages/Home/components/ChatRoom.tsx";

export interface MessageDto {
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
    const [stompClient, setStompClient] = useState<StompClient | null>(null);
    const [rooms, setRooms] = useState<IRoomRepository[]>([]);
    const [currentRoom, setCurrentRoom] = useState<IRoomRepository | null>(null);
    const user = useSelector((state: RootState) => state.users);
    const navigate = useNavigate();


    if (!user.id) {
        navigate(LOGIN);
    }

    async function fetchData() {
        const roomRepo = new RoomRepository();
        const data = await roomRepo.getMany();
        setRooms(data.data!);
    }

    function subscribeToRoom(room: IRoomRepository) {
        setCurrentRoom(room);
        //TODO: manage subscription to the current room
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const client = new StompClient();
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
                                    <button className="text-2xl text-slate-300 mt-4" onClick={() => subscribeToRoom(room)}>{room.id}</button>
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
                    {currentRoom ? (
                        <ChatRoom currentRoom={currentRoom} stompClient={stompClient} user={user} />
                    ) : <h1 className="text-3xl text-slate-300 text-center">Welcome to WebChat Application</h1>}
                </div>
            </div>
        </div>
    );
}

export default HomePage;

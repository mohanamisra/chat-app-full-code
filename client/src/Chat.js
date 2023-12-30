import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import InfoBar from "./components/InfoBar/InfoBar";
import Input from "./components/Input/Input";
import Messages from "./components/Messages/Messages";
import TextContainer from "./components/TextContainer/TextContainer";
import { useLocation } from "react-router";

import "./Chat.css";
const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT, {
    transports: ["websocket"],
});

const Chat = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState("");
    let location = useLocation();

    useEffect(() => {
        const info = location.state;
        const query_name = info.name;
        const query_room = info.room;
        console.log(query_name, query_room);
        if (!query_name || !query_room) {
            console.log("I forgot...");
        } else {
            setName(query_name);
            setRoom(query_room);
            socket.emit("join", { name: query_name, room: query_room }, () => {});
        }

        socket.on("message", (new_message) => {
            setMessages([...messages, new_message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages, location]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) socket.emit("sendMessage", message, () => setMessage(""));
    };

    return (
        <div className="outerContainer">
            <TextContainer users={users} />
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;

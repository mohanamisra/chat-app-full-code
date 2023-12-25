import React from "react";
import { useState, useEffect } from "react";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import InfoBar from "./components/InfoBar/InfoBar";
import Input from "./components/Input/Input";
import Messages from "./components/Messages/Messages";
import TextContainer from "./components/TextContainer/TextContainer";

import "./Chat.css";
const ENDPOINT = 'https://cyberpunkchat.onrender.com';
const socket = io(ENDPOINT, {
    transports: ["websocket"],
}); // ! now defined globally

const Chat = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState("");

    useEffect(() => {
        const info = queryString.parse(window.location.search);
        const query_name = info.name; // ! to prevent name conflicts
        const query_room = info.room; // ! to prevent name conflicts
        console.log(query_name, query_room);
        if (!query_name || !query_room) {
            console.log("I forgot...");
        } else {
            setName(query_name);
            setRoom(query_room);
            socket.emit("join", { name: query_name, room: query_room }, () => {});
        }
    }, [navigate]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

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

import React from 'react';
import {useState, useEffect} from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import InfoBar from "./components/InfoBar/InfoBar";
import Input from "./components/Input/Input";
import Messages from "./components/Messages/Messages";
import TextContainer from "./components/TextContainer/TextContainer";

import './Chat.css';

let socket;

const Chat = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const ENDPOINT = 'https://cyberpunkchat.onrender.com';

    useEffect(() => {
        const {name, room} = queryString.parse(window.location.search);
        socket = io(ENDPOINT, {transports:['websocket']});
        if(!name || !room) {
            console.log('I forgot...');
        }
        else {
            setName(name);
            setRoom(room);
            socket.emit('join', {name, room}, () => {

            });

            const handleBeforeUnload = () => {
                socket.emit('disconnect');
            };

            window.addEventListener('unload', handleBeforeUnload);

            return () => {
                window.removeEventListener('unload', handleBeforeUnload);
                socket.emit('disconnect');
                socket.off();
            };
        }
    }, [ENDPOINT, navigate]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    const handleMessageChange = (event) => {
        const newMessage = event.target.value;
        setMessage(newMessage);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        if(message)
            socket.emit('sendMessage', message, () => setMessage(''));
    }

    const handleMessageSend = (event) => {
        if(event.key === 'Enter')
            sendMessage(event);
    }

    return(
        <div className = 'outerContainer'>
            <TextContainer users = {users}/>
            <div className = 'container'>
                <InfoBar room = {room}/>
                <Messages messages = {messages} name = {name}/>
                <Input message = {message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat;
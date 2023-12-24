import React from 'react';
import {useState, useEffect} from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

import './Chat.css';

let socket;

const Chat = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(window.location.search);
        socket = io(ENDPOINT, {transports:['websocket']});
        if(!name || !room) {
            navigate('/');
        }
        else {
            setName(name);
            setRoom(room);
            socket.emit('join', {name, room}, () => {

            });
            return () => {
                socket.emit('disconnect');
                socket.off();
            }
        }
    }, [ENDPOINT, window.location.search]);

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

    console.log(message, messages)

    return(
        <div className = 'outerContainer'>
            <div className = 'container'>
                <InfoBar room = {room}/>
                <Messages messages = {messages} name = {name}/>
                <Input message = {message} handleMessageChange={handleMessageChange} handleMessageSend={handleMessageSend}/>
            </div>
            <TextContainer users = {users}/>
        </div>
    )
}

export default Chat;
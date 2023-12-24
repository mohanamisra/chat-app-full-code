import React from 'react';
import {useState, useEffect} from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import './Chat.css';

let socket;

const Chat = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
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

    return(
        <h1>CHAT</h1>
    )
}

export default Chat;
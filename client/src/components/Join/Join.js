import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
    }

    const handleRoomNameChange = (event) => {
        const newRoom = event.target.value;
        setRoom(newRoom);
    }

    const handleButtonClick = (event) => {
        if(!name || !room)
            event.preventDefault();
    }

    return(
        <div className = 'joinOuterContainer'>
            <div className = 'joinInnerContainer'>
                <h1 className = 'heading'>Join</h1>
                <form className = 'form'>
                    <div><input placeholder = 'Enter name' className = 'joinInput' type = 'text' onChange = {handleNameChange}/></div>
                    <div><input placeholder = 'Enter room name' className = 'joinInput mt-20' type = 'text' onChange = {handleRoomNameChange}/></div>
                    <Link onClick = {handleButtonClick} to = {`/chat?name=${name}&room=${room}`}>
                        <button className = 'button mt-20' type = 'submit'>Sign In</button>
                    </Link>
                </form>
            </div>
        </div>
    )
};

export default Join;
import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import TypeIt from 'typeit-react';
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
                <TypeIt className = 'heading'
                        getBeforeInit={(instance) => {
                    instance.type("Login!").pause(1000).delete(1).pause(500).type("");
                    return instance;
                }} options={{
                        speed: 60,
                        waitUntilVisible: true,
                        afterComplete: function (instance) {
                            instance.destroy();
                        }
                    }}
                />
                <form className = 'form'>
                    <div><input placeholder = 'Enter name' className = 'joinInput' type = 'text' onChange = {handleNameChange}/></div>
                    <div><input placeholder = 'Enter room name' className = 'joinInput' type = 'text' onChange = {handleRoomNameChange}/></div>
                    <Link onClick = {handleButtonClick} to = {`/chat?name=${name}&room=${room}`}>
                        <button className = 'button' type = 'submit'>Sign In</button>
                    </Link>
                </form>
            </div>
        </div>
    )
};

export default Join;
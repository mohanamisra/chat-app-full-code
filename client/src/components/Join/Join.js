import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TypeIt from "typeit-react";
import "./Join.css";

const Join = () => {
    const [name, setName] = useState("john");
    const [room, setRoom] = useState("room1");
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
    };

    const handleRoomNameChange = (event) => {
        const newRoom = event.target.value;
        setRoom(newRoom);
    };

    const handleButtonClick = (event) => {
        event.preventDefault();

        if (!name || !room) return;

        navigate("/chat", { state: { name, room } });
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <TypeIt
                    className="heading"
                    getBeforeInit={(instance) => {
                        instance.type("Login!").pause(1000).delete(1).pause(500).type("");
                        return instance;
                    }}
                    options={{
                        speed: 60,
                        waitUntilVisible: true,
                    }}
                />
                <form className="form">
                    <div>
                        <input
                            placeholder="Enter name"
                            className="joinInput"
                            type="text"
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Enter room name"
                            className="joinInput"
                            type="text"
                            onChange={handleRoomNameChange}
                        />
                    </div>

                    <button onClick={handleButtonClick} className="button">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Join;

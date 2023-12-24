import React from 'react';
import './Input.css';

const Input = ({message, handleMessageChange, handleMessageSend}) => {
    return (
        <form className = 'message-form'>
            <input className = 'message-input' type = 'text' placeholder = 'Type your message...' value = {message}
                   onChange = {handleMessageChange} onKeyPress = {handleMessageSend}/>
            <button className = 'sendButton' onClick = {handleMessageSend}>Send</button>
        </form>
    )
}

export default Input;
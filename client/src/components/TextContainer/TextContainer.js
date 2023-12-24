import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
    <div className="textContainer">
        {
            users
                ? (
                    <div>
                        <div className="activeContainer">
                            <h1 className = 'containerHeading'>Users online:</h1>
                            {users.map(({name}) => (
                                    <div key={name} className="activeItem">
                                        {name}
                                        <img className = 'onlineIcon' alt="Online Icon" src={onlineIcon}/>
                                    </div>
                                ))}
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;
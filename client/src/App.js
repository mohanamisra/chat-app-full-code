import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './Chat';

const App = () => {
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = 'Are you sure you want to reload? You will have to click the link again to access the app.';
            event.returnValue = message
            return message;
        };

        window.addEventListener('onbeforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('onbeforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <Router basename = "/">
            <Routes>
                <Route path='/' element={<Join/>}/>
                <Route path='/chat' element={<Chat/>}/>
            </Routes>
        </Router>
    );
};

export default App;
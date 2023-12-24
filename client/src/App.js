import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './Chat';

const App = () => {
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
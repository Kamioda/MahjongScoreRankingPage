import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexItem from './main/index.jsx';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route extract path="/:language/" Component={IndexItem}></Route>
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(<React.StrictMode><App /></React.StrictMode>)
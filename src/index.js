import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexItem from './main/home.jsx';
import addRecordFormItem from './main/add.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index={true} extract path="/:language/" Component={IndexItem} />
                <Route index extract path="/:language/new" Component={addRecordFormItem} />
            </Routes>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

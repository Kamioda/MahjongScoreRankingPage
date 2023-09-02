import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './main/index.jsx';
import IndexItem from './main/home.jsx';
import addRecordFormItem from './main/add.jsx';
import PlayerAdminPageItem from './main/adminPlayer.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index Component={Index} />
                <Route extract path="/:language/" Component={IndexItem} />
                <Route extract path="/:language/new" Component={addRecordFormItem} />
                <Route extract path="/:language/user" Component={PlayerAdminPageItem} />
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

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Routes} from 'react-router';
import UserList from './pages/UserList';
import UserRegistration from './pages/UserRegistration';
import UserEditing from './pages/UserEditing';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList/>}/>
                <Route path="/users/register" element={<UserRegistration/>}/>
                <Route path="/users/edit/:id" element={<UserEditing/>}/>
            </Routes>
        </Router>
    );
};

export default App;

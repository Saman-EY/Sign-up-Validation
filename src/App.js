import React from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default App;

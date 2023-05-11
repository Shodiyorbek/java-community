import React from "react";
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import Main from "./Main";
import Login from "./admin/auth/Login";
import Register from "./admin/auth/Register";






const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;

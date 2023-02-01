import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Employees from "./pages/Employees";

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/tips' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/waiters' element={<Employees/>}/>
            <Route path='*' element={<Home/>}/>
        </Routes>
    );
};

export default AppRouter;

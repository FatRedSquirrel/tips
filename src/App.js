import React from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import WaitersList from "./pages/WaitersList";
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path='/tips' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/waiters' element={<WaitersList/>}/>
            </Routes>
        </>
    )
}

export default App;

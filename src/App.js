import React from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import {Routes, Route} from "react-router-dom";
import DarkModeToggle from "./components/minor/DarkModeToggle";
import {useSelector} from "react-redux";

function App() {

    const {darkMode} = useSelector(store => store.darkMode);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <DarkModeToggle/>
            <Routes>
                <Route path='/tips' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/waiters' element={<Employees/>}/>
            </Routes>
        </div>
    )
}

export default App;

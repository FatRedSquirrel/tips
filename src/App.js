import React from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import {Routes, Route} from "react-router-dom";
import DarkModeToggle from "./components/minor/DarkModeToggle";
import {useDispatch, useSelector} from "react-redux";
import {fetchWaiters} from "./redux/slices/waiters";

function App() {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchWaiters());
    }, []);

    const {darkMode} = useSelector(store => store.darkMode);
    const {waiters} = useSelector(store => store.waiters);
    const {fete} = useSelector(store => store.fete);
    const {mainFields} = useSelector(store => store.mainFields);
    const {isManagerRich} = useSelector(store => store.mainFields.mainFields);
    const {data: isAuth} = useSelector(store => store.auth);

    //Сохранение данных в localStorage
    const dataToStore = {
        'fete': fete,
        'mainFields': mainFields,
        'waiters': waiters,
        'isManagerRich': isManagerRich,
        'darkMode': darkMode,
        'isAuth': isAuth
    }

    React.useEffect(() => {
        for (let [name, obj] of Object.entries(dataToStore)) {
            localStorage.setItem(`${name}`, JSON.stringify(obj));
        }
    }, Object.values(dataToStore));

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <DarkModeToggle/>
            <Routes>
                <Route path='/tips' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/waiters' element={<Employees/>}/>
                <Route path='*' element={<Home/>}/>
            </Routes>
        </div>
    )
}

export default App;

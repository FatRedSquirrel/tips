import React from 'react';
import DarkModeToggle from "components/minor/DarkModeToggle";
import {useDispatch, useSelector} from "react-redux";
import {fetchWaiters} from "./redux/slices/waiters";
import AppRouter from "router";

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

    const {isLoaded: isWaitersLoaded} = useSelector(store => store.waiters);

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
        <div
            className={`app ${isWaitersLoaded ? '' : 'loading'} ${darkMode ? 'dark' : ''}`}
        >
            {/*<DarkModeToggle/>*/}
            <AppRouter/>
        </div>
    )
}

export default App;

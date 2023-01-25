import React from 'react';
import WarningMessage from '../components/minor/WarningMessage';
import Results from "../components/major/Results";
import SideMenu from "../components/major/SideMenu";
import WaitersChart from "../components/major/WaitersChart";
import EnvelopeLanding from "../components/major/Envelope-Landing";
import Fete from "../components/major/Fete";
import WaitersMoney from "../components/major/WaitersMoney";
import Header from "../components/major/Header"

import {useDispatch, useSelector} from 'react-redux';
import {fetchWaiters} from "../redux/slices/waiters";

function Home() {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchWaiters());
    }, []);

    const {waiters} = useSelector(store => store.waiters);
    const {mainFields} = useSelector(store => store.mainFields);
    const {fete} = useSelector(store => store.fete);

    const [darkMode, setDarkMode] = React.useState(false);
    const [isManagerRich, setIsManagerRich] = React.useState(false);
    const [isWarningMessageShown, setIsWarningMessageShown] = React.useState(false);

    const isWaitersLoading = useSelector(store => store.waiters.status) === 'loading';

    function toggleDarkMode() {
        setDarkMode(prev => !prev);
    }

    function handleIsManagerRichChange() {
        setIsManagerRich(prev => !prev);
    }

    function showWarningMessage() {
        setIsWarningMessageShown(true);
        setTimeout(() => {
            setIsWarningMessageShown(false);
        }, 2000);
    }

    // код для сохранения данных лежит в самом низу файла

    return isWaitersLoading ? <div>...Загрузка</div> : (
        <div className={darkMode ? "home dark" : "home"}>
            <SideMenu waiters={waiters}/>
            <div className="main">
                <Header
                    waiters={waiters}
                    fete={fete}
                    mainFields={mainFields}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />
                <WaitersChart waiters={waiters}/>
                <EnvelopeLanding
                    isManagerRich={isManagerRich}
                    mainFields={mainFields}
                    handleIsManagerRichChange={handleIsManagerRichChange}
                    darkMode={darkMode}
                />
                <Fete
                    fete={fete}
                    setFeteData={() => console.log('hi')}
                />
                <Results
                    fete={fete}
                    mainFields={mainFields}
                    isManagerRich={isManagerRich}
                    showWarning={showWarningMessage}
                />
                <WaitersMoney
                    waiters={waiters}
                    mainFields={mainFields}
                    showWarning={showWarningMessage}
                />
            </div>
            <WarningMessage isShown={isWarningMessageShown}>Нет данных</WarningMessage>
        </div>
    )
}

export default Home;

//Сохранение данных
// const dataToStore = {
//     'feteData': feteData,
//     'additionalFields': additionalFields,
//     'waiters': waiters,
//     'darkMode': darkMode,
//     'isManagerRich': isManagerRich,
// }
//
// React.useEffect(() => {
//     for (let [name, obj] of Object.entries(dataToStore)) {
//         localStorage.setItem(`${name}`, JSON.stringify(obj));
//     }
// }, Object.values(dataToStore));
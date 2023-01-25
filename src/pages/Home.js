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
    const isWaitersLoading = useSelector(store => store.waiters.status) === 'loading';

    const {waiters} = useSelector(store => store.waiters);

    React.useEffect(() => {
        dispatch(fetchWaiters());
    }, []);

    const [darkMode, setDarkMode] = React.useState(false);
    const [isManagerRich, setIsManagerRich] = React.useState(false);
    const [isWarningMessageShown, setIsWarningMessageShown] = React.useState(false);

    //Массив с объектами банкетов
    const [feteData, setFeteData] = React.useState([{
        id: 1,
        preorder: '',
        order: ''
    }]);

    //Объект прочих полей
    const [additionalFields, setAdditionalFields] = React.useState({
        tables: '',
        money: '',
        waitersMoney: ''
    });

    function toggleDarkMode() {
        setDarkMode(prev => !prev);
    }

    //Обработчик ввода данных в поля предзаказов и дозаказов, обновление данных о банкетах
    function handleFeteChange(evt) {
        const {id, value, name} = evt.target;
        // checking whether value is number
        if (isNaN(+value)) return;
        setFeteData(prevFeteData => {
            let newFeteData = [];
            for (let i = 0; i < prevFeteData.length; i++) {
                let currentFete = prevFeteData[i];
                if (+id === currentFete.id) {
                    currentFete[name] = value;
                }
                newFeteData.push(currentFete);
            }
            return newFeteData;
        })
    }

    //Обработчик ввода данных в дополнительные поля, изменение данных об этих полях
    function handleAdditionalFieldsChange(evt) {
        const {name, value} = evt.target;
        if (isNaN(+value)) return;
        setAdditionalFields(prevState => {
                return {
                    ...prevState,
                    [name]: value
                }
            }
        )
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

    function changeHours(evt, id) {
        // setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
        //     ...waiter,
        //     hours: evt.target.value
        // } : waiter))
    }

    function handleHasMoneyChange(evt, id) {
        // setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
        //     ...waiter,
        //     hasMoney: value
        // } : waiter))
    }

    // код для сохранения данных лежит в самом низу файла

    return isWaitersLoading ? <div>...Загрузка</div> : (
        <div className={darkMode ? "home dark" : "home"}>
            <SideMenu waiters={waiters}/>
            <div className="main">
                <Header
                    waiters={waiters}
                    feteData={feteData}
                    additionalFields={additionalFields}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />
                <WaitersChart
                    waiters={waiters}
                    changeHours={changeHours}
                    handleHasMoneyChange={handleHasMoneyChange}
                />
                <EnvelopeLanding
                    isManagerRich={isManagerRich}
                    handleAdditionalFieldsChange={handleAdditionalFieldsChange}
                    additionalFields={additionalFields}
                    handleIsManagerRichChange={handleIsManagerRichChange}
                    darkMode={darkMode}
                />
                <Fete feteData={feteData} handleFeteChange={handleFeteChange} setFeteData={setFeteData}/>
                <Results
                    feteData={feteData}
                    additionalFields={additionalFields}
                    isManagerRich={isManagerRich}
                    showWarning={showWarningMessage}
                />
                <WaitersMoney
                    waiters={waiters}
                    handleAdditionalFieldsChange={handleAdditionalFieldsChange}
                    additionalFields={additionalFields}
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
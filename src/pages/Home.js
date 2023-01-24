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

    const {waiters} = useSelector(state => state.waiters);

    console.log(waiters)

    const isWaitersLoading = useSelector(state => state.waiters.status) === 'loading';

    React.useEffect(() => {
        dispatch(fetchWaiters());
    }, []);

    const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem('darkMode')) || false);
    const [isManagerRich, setIsManagerRich] = React.useState(JSON.parse(localStorage.getItem('isManagerRich')) || false);
    const [isWarningMessageShown, setIsWarningMessageShown] = React.useState(false);

    //Массив данных об официантах
    // const [waiters, setWaiters] = React.useState(
    //     //Проверяем длину data, чтобы обновлять данные в случае появления нового официанта
    //     ((JSON.parse(localStorage.getItem("waiters")) && data.length !== JSON.parse(localStorage.getItem("waiters")).length) || !JSON.parse(localStorage.getItem("waiters")) && !isWaitersLoading) ?
    //         data :
    //         JSON.parse(localStorage.getItem("waiters"))
    // );
    // console.log(isWaitersLoading)
    // console.log(data)
    // const [waiters, setWaiters] = React.useState(isWaitersLoading ? [] : data);
    // console.log(waiters)
    //Массив с объектами банкетов
    const [feteData, setFeteData] = React.useState(JSON.parse(localStorage.getItem('fete')) || [{
        id: 1,
        preorder: '',
        order: ''
    }]);

    //Объект прочих полей
    const [additionalFields, setAdditionalFields] = React.useState(JSON.parse(localStorage.getItem('additionalFields')) || {
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

    function onCommentInput(event, id) {
        // setWaiters(prev => prev.map(waiter => waiter.id === id ? {...waiter, comment: event.target.value} : waiter))
    }

    function chooseWaiter(id) {
        // setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
        //     ...waiter,
        //     isChosen: !waiter.isChosen
        // } : waiter))
    }

    function changeHours(evt, id) {
        // setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
        //     ...waiter,
        //     hours: evt.target.value
        // } : waiter))
    }

    function handleHasMoneyChange(evt, id) {
        const {value} = evt.target;
        if (isNaN(+value)) return;
        // setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
        //     ...waiter,
        //     hasMoney: value
        // } : waiter))
    }

    //Сохранение данных
    const dataToStore = {
        'feteData': feteData,
        'additionalFields': additionalFields,
        'waiters': waiters,
        'darkMode': darkMode,
        'isManagerRich': isManagerRich,
    }

    React.useEffect(() => {
        for (let [name, obj] of Object.entries(dataToStore)) {
            localStorage.setItem(`${name}`, JSON.stringify(obj));
        }
    }, Object.values(dataToStore));

    return isWaitersLoading ? <div>...Загрузка</div> : (
        <div className={darkMode ? "home dark" : "home"}>
            <SideMenu chooseWaiter={chooseWaiter} waiters={waiters}/>
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
                    onCommentInput={onCommentInput}
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
                    // setWaiters={setWaiters}
                    setWaiters={() => console.log('hi')}
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
import React, {useState} from 'react';
import './App.scss';
import Order from "./Components/Order";
import Preorder from "./Components/Preorder";
import WaiterSideMenu from "./Components/WaiterSideMenu";
import WaiterMain from "./Components/WaiterMain";
import {data} from "./data";
import IsManagerRich from "./Components/IsManagerRich";
import Results from "./Components/Results";
import DarkModeToggle from "./Components/DarkModeToggle";
import AdminModal from "./Components/AdminModal";

function App() {

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem('isAdmin')) || false);
    const [isLoginValid, setIsLoginValid] = useState(true);

    function toggleDarkMode() {
        setDarkMode(prev => !prev);
    }

    //Вспомогательное состояние для условного рендера блока с результатами
    const [resultsShown, setResultsShown] = React.useState(false);

    //Массив данных об официантах
    const [waiters, setWaiters] = React.useState(
        //Проверяем длину data, чтобы обновлять данные в случае появления нового официанта
        (JSON.parse(localStorage.getItem("waiters")) && data.length > JSON.parse(localStorage.getItem("waiters")).length) || !JSON.parse(localStorage.getItem("waiters")) ?
            data :
            JSON.parse(localStorage.getItem("waiters"))
    );

    //Массив с объектами банкетов
    const [feteData, setFeteData] = React.useState(JSON.parse(localStorage.getItem('fete')) || [{
        id: 1,
        preorder: '',
        order: ''
    }])

    //Объект прочих полей
    const [additionalFields, setAdditionalFields] = React.useState(JSON.parse(localStorage.getItem('additionalFields')) || {
        tables: '',
        money: '',
        isManagerRich: false,
        waitersMoney: ''
    })

    //Объект с результатами вычислений
    const [results, setResults] = React.useState({
        kitchen: 0,
        bar: 0,
        manager: 0
    })

    //Массив элементов предзаказов
    const preorders = feteData.map((fete) =>
        <Preorder
            action={handleFeteChange}
            key={fete.id}
            id={fete.id}
            value={fete.preorder}
        />
    )

    //Массив элементов дозаказов
    const orders = feteData.map((fete) =>
        <Order
            action={handleFeteChange}
            key={fete.id}
            id={fete.id}
            value={fete.order}
        />
    )

    //Функция для добавления банкета
    function add() {
        setFeteData((prevFeteData) => {
            return [...prevFeteData, {
                id: prevFeteData.length + 1,
                preorder: '',
                order: ''
            }]
        })
    }

    //Функция для удаления банкета
    function remove() {
        setFeteData(prevFeteData => prevFeteData.slice(0, prevFeteData.length - 1))
    }

    //Обработчик ввода данных в поля предзаказов и дозаказов, обновление данных о банкетах
    function handleFeteChange(evt) {
        const {id, value, name} = evt.target;
        setFeteData(prevFeteData => {
            let newFeteData = [];
            for (let i = 0; i < prevFeteData.length; i++) {
                let currentFete = prevFeteData[i];
                if (Number(id) === currentFete.id) {
                    currentFete[name] = value;
                }
                newFeteData.push(currentFete);
            }
            return newFeteData;
        })
    }

    //Обработчик ввода данных в дополнительные поля, изменение данных об этих полях
    function handleAdditionalFieldsChange(evt) {
        const {name, value, type, checked} = evt.target;
        setAdditionalFields(prevState => {
                return {
                    ...prevState,
                    [name]: type === "checkbox" ? checked : value
                }
            }
        )
    }

    //Функция для получения финальных значений
    function countDivisions() {
        setResultsShown(true);
        let sumPreorders = 0;
        let sumOrders = 0;
        for (let i = 0; i < feteData.length; i++) {
            sumPreorders += Number(feteData[i].preorder);
            sumOrders += Number(feteData[i].order);
        }
        setResults(prevResults => ({
                ...prevResults,
                kitchen: Math.floor(sumPreorders / 50),
                bar: Math.floor((sumPreorders / 100 + sumOrders / 100) + Number(additionalFields.tables / 10)),
                manager: additionalFields.isManagerRich ? Math.floor(Number(additionalFields.money / 10)) : Math.floor(sumPreorders / 100 + sumOrders / 100)
            }
        ))
    }

    //Массив элементов официантов бокового меню
    const waiterSideMenuElements = waiters.map((waiter) =>
        <WaiterSideMenu
            key={waiter.id}
            name={waiter.name}
            chooseWaiter={() => chooseWaiter(waiter.id)}
            isChosen={waiter.isChosen}
        />
    )

    //Массив элементов выбранных официантов
    const chosenWaitersElements = waiters.filter(waiter => waiter.isChosen).map((chosenWaiter, index) =>
        <WaiterMain
            key={chosenWaiter.id}
            name={chosenWaiter.name}
            index={index + 1}
            hasMoney={chosenWaiter.hasMoney}
            toReceive={chosenWaiter.toReceive}
            hours={chosenWaiter.hours}
            changeHours={(evt) => changeHours(evt, chosenWaiter.id)}
            handleHasMoneyChange={(evt) => handleHasMoneyChange(evt, chosenWaiter.id)}
            bank={chosenWaiter.bank}
            phoneNumber={chosenWaiter.phoneNumber}
        />
    )

    function chooseWaiter(id) {
        setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
            ...waiter,
            isChosen: !waiter.isChosen
        } : waiter))
    }

    function changeHours(evt, id) {
        setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
            ...waiter,
            hours: evt.target.value
        } : waiter))
    }

    function handleHasMoneyChange(evt, id) {
        setWaiters(prevState => prevState.map(waiter => waiter.id === id ? {
            ...waiter,
            hasMoney: evt.target.value
        } : waiter))
    }

    function countWaiters() {
        let waitersAmount = 0;
        for (let waiter of waiters) {
            if (waiter.isChosen) {
                waitersAmount += Number(waiter.hours / 12);
            }
        }
        //Прибавляем сумму верхов к чистым деньгам офиков
        let waitersCards = 0;
        for (let waiter of waiters) {
            if (waiter.isChosen) {
                waitersCards += Number(waiter.hasMoney);
            }
        }

        const allTheMoney = Number(additionalFields.waitersMoney) + waitersCards

        const tipsPerWaiter = allTheMoney / waitersAmount;
        setWaiters(prevState =>
            prevState.map(waiter => {
                if (waiter.isChosen) {
                    return {
                        ...waiter,
                        toReceive: Math.floor(tipsPerWaiter * waiter.hours / 12 - waiter.hasMoney)
                    }
                }
                return waiter;
            })
        )
    }

    function login(event) {
        event.preventDefault();
        if (event.target.querySelector('.admin-modal-input').value === 'zxc666') {
            setIsAdmin(true);
        } else {
            setIsLoginValid(false);
        }
        console.log(isAdmin)
    }

    function openSideMenu() {
        const sideMenu = document.querySelector(".side-menu");
        const overlay = document.querySelector(".overlay");
        const burger = document.querySelector(".burger");
        burger.classList.add("hidden");
        sideMenu.classList.add("open");
        overlay.classList.remove("hidden");
        document.body.classList.add("lock-scroll");
        document.documentElement.classList.add("lock-scroll");
    }

    function closeSideMenu() {
        const sideMenu = document.querySelector(".side-menu");
        const overlay = document.querySelector(".overlay");
        const burger = document.querySelector(".burger");
        burger.classList.remove("hidden");
        sideMenu.classList.remove("open");
        overlay.classList.add("hidden");
        document.body.classList.remove("lock-scroll");
        document.documentElement.classList.remove("lock-scroll");
    }

    console.log(isAdmin)

    //Сохранение данных
    React.useEffect(() => {
        localStorage.setItem('fete', JSON.stringify(feteData));
        localStorage.setItem('additionalFields', JSON.stringify(additionalFields));
        localStorage.setItem('waiters', JSON.stringify(waiters));
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin))
    }, [feteData, additionalFields, waiters, darkMode, isAdmin]);

    return (
        <div className={darkMode ? "overall-container dark" : "overall-container"}>
            <div className="side-menu">
                {waiterSideMenuElements}
            </div>
            <div className="main">
                <DarkModeToggle
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                />
                <button
                    className="admin-modal-open"
                    onClick={() => {
                        setIsModalOpen(true)
                        document.body.classList.add("lock-scroll");
                    }
                    }
                >
                    Админ
                </button>
                <AdminModal
                    isModalOpen={isModalOpen}
                    login={(event => {
                        login(event)
                    })}
                    closeModal={() => {
                        setIsModalOpen(false);
                        document.body.classList.remove("lock-scroll");
                    }
                    }
                />
                <div className="waiters-main-container">
                    {waiters.filter(waiter => waiter.isChosen).length === 0 &&
                        <p className="hint">Добавьте официантов из бокового меню сюда</p>}
                    {waiters.filter(waiter => waiter.isChosen).length !== 0 && <div className="waiters-main">
                        <header className="waiters-main__header">
                            <span className="waiter">Официант</span>
                            <span className="hours">Часы</span>
                            <span className="has">На карте</span>
                            <span className="to-receive">К получению</span>
                        </header>
                        {chosenWaitersElements}
                    </div>}
                </div>
                <div className="overlay hidden" onClick={closeSideMenu}></div>
                <button className="burger" onClick={openSideMenu}></button>
                <div className="main-top">
                    <div className="wrapper">
                        <h1 className="title">Конверт</h1>
                        <input
                            type="number"
                            name="money"
                            onChange={handleAdditionalFieldsChange}
                            value={additionalFields.money}
                            className="tips-input"
                        />
                    </div>
                    <div className="wrapper">
                        <h1 className="title">Посадка</h1>
                        <input
                            type="number"
                            name="tables"
                            onChange={handleAdditionalFieldsChange}
                            value={additionalFields.tables}
                            className="tips-input"
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="inputs-container">
                        <h1 className="title">Предзаказы</h1>
                        <ul>
                            {preorders}
                        </ul>
                    </div>
                    <div className="inputs-container">
                        <h1 className="title">Дозаказы</h1>
                        {orders}
                    </div>
                </div>
                <div className="fete-buttons-container">
                    <button onClick={add} className="button fete-button plus">+</button>
                    <button onClick={remove} className="button fete-button minus">-</button>
                </div>
                <IsManagerRich
                    isManagerRich={additionalFields.isManagerRich}
                    handleAdditionalFieldsChange={handleAdditionalFieldsChange}
                    darkMode={darkMode}
                />
                <button onClick={countDivisions} className="button count">Посчитать отчисления</button>
                {resultsShown && <Results
                    kitchen={results.kitchen}
                    bar={results.bar}
                    manager={results.manager}
                />}
                <div className="waiters-money">
                    <input
                        type="number"
                        placeholder="Деньги официантов"
                        className="waiters-money-input"
                        name="waitersMoney"
                        onChange={handleAdditionalFieldsChange}
                        value={additionalFields.waitersMoney}
                    />
                    <div
                        className="waiters-money-tooltip"
                    >
                        ?
                        <div className="waiters-money-tooltip-text">Без карт, они будут учтены и прибавлены автоматически</div></div>
                </div>
                <button onClick={countWaiters} className="button count">Посчитать официантов</button>
            </div>
        </div>

    )
}

export default App;

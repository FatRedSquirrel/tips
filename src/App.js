import React, {useEffect, useState} from 'react';
import './App.scss';
import {data} from "./data";
import {updateLocalStorageData} from "./utils";
import Waiter from "./Waiter";
import Order from "./Components/Order";
import Preorder from "./Components/Preorder";
import WaiterSideMenu from "./Components/WaiterSideMenu";
import WaiterMain from "./Components/WaiterMain";
import IsManagerRich from "./Components/IsManagerRich";
import Results from "./Components/Results";
import DarkModeToggle from "./Components/DarkModeToggle";
import AdminModal from "./Components/AdminModal";
import NewWaiter from "./Components/NewWaiter";
import ResetConfirmationModal from "./Components/ResetConfirmationModal";


function App() {

    useEffect(() => {
        console.log('hi')
        updateLocalStorageData();
    }, [])

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem('isAdmin')) || false);
    const [isLoginValid, setIsLoginValid] = useState(true);
    const [isWaiterRemovalInProcess, setIsWaiterRemovalInProcess] = useState(false);
    const [resetConfirmation, setResetConfirmation] = useState(false);
    const [resetConfirmed, setResetConfirmed] = useState(false);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [isManagerRich, setIsManagerRich] = useState(JSON.parse(localStorage.getItem('isManagerRich')) || false);

    const itemsNoReset = ['darkMode'];

    function toggleDarkMode() {
        setDarkMode(prev => !prev);
    }

    //Вспомогательное состояние для условного рендера блока с результатами
    const [resultsShown, setResultsShown] = React.useState(false);

    //Массив данных об официантах
    const [waiters, setWaiters] = React.useState(
        //Проверяем длину data, чтобы обновлять данные в случае появления нового официанта
        (JSON.parse(localStorage.getItem("waiters")) && data.length !== JSON.parse(localStorage.getItem("waiters")).length) || !JSON.parse(localStorage.getItem("waiters")) ?
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
        const {name, value} = evt.target;
        setAdditionalFields(prevState => {
                return {
                    ...prevState,
                    [name]: value
                }
            }
        )
    }

    function handleIsManagerRichChange() {
        setIsManagerRich(prev => !prev)
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
                manager: isManagerRich ? Math.floor(Number(additionalFields.money / 10)) : Math.floor(sumPreorders / 100 + sumOrders / 100)
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
            isWaiterRemovalInProcess={isWaiterRemovalInProcess}
            deleteWaiter={(event) => deleteWaiter(event, waiter.id)}
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
            comment={chosenWaiter.comment}
            onCommentInput={(event) => onCommentInput(event, chosenWaiter.id)}
        />
    )

    function onCommentInput(event, id) {
        setWaiters(prev => prev.map(waiter => waiter.id === id ? {...waiter, comment: event.target.value} : waiter))
    }

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
        if (event.target.querySelector('.admin-modal-input').value === '808123') {
            setIsAdmin(true);
            setIsLoginValid(true);
        } else {
            setIsLoginValid(false);
        }
    }

    function logout() {
        setIsAdmin(false);
    }

    function addNewWaiter(event) {
        const nameField = event.target.querySelector('.new-waiter-input');
        const name = nameField.value;
        if (name) {
            setWaiters(prev => [
                new Waiter(name),
                ...prev
            ])
        }
        nameField.value = '';
    }

    function deleteWaiter(event, id) {
        event.stopPropagation();
        setWaiters(prev => prev.filter(waiter => waiter.id !== id));
        setIsWaiterRemovalInProcess(false);
    }

    function reset() {
        // Запрашивать подтверждение, если хоть 1 официант выбран или если введены цифры хотя бы в 1 поле
        if (waiters.some(waiter => waiter.isChosen) || (feteData.some(fete => fete.preorder || fete.order)) || Object.values(additionalFields).some(value => value)) {
            setResetConfirmation(true);
            return;
        }
        setResetConfirmed(true);
        //таймаут для того, чтобы сброс произошел после завершения анимации спина кнопки ресета
        setTimeout(() => {
            clearLocalStorage();
            document.location.reload();
        }, 600)
    }

    function clearLocalStorage() {
        Object.keys({...localStorage}).forEach(key => {
            if (!itemsNoReset.includes(key)) {
                localStorage.removeItem(key);
            }
        })
    }

    function toggleSideMenu() {
        setSideMenuOpen(prev => !prev);
        document.body.classList.toggle("lock-scroll");
        document.documentElement.classList.toggle("lock-scroll");
    }

    //Сохранение данных
    React.useEffect(() => {
        localStorage.setItem('fete', JSON.stringify(feteData));
        localStorage.setItem('additionalFields', JSON.stringify(additionalFields));
        localStorage.setItem('waiters', JSON.stringify(waiters));
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        localStorage.setItem('isManagerRich', JSON.stringify(isManagerRich));
    }, [feteData, additionalFields, waiters, darkMode, isAdmin, isManagerRich]);

    return (
        <div className={darkMode ? "overall-container dark" : "overall-container"}>
            <div className={sideMenuOpen ? "side-menu open" : "side-menu"}>
                {isAdmin && <NewWaiter
                    addNewWaiter={(event) => {
                        event.preventDefault();
                        addNewWaiter(event);
                    }}
                />}
                {waiterSideMenuElements}
                {isAdmin && <button
                    onClick={() => {
                        setIsWaiterRemovalInProcess(prev => !prev)
                    }}
                    className="delete-waiter"
                >
                    {isWaiterRemovalInProcess
                        ? "Отмена"
                        : "Удалить официанта"}
                </button>}
            </div>
            <div className="main">
                {resetConfirmation &&
                    <ResetConfirmationModal
                        resetButtonClickHandler={() => {
                            setResetConfirmation(false);
                            setResetConfirmed(true);
                            //таймаут для того, чтобы сброс произошел после завершения анимации спина кнопки ресета
                            setTimeout(() => {
                                clearLocalStorage();
                                document.location.reload();
                            }, 600)
                        }}
                        cancelButtonClickHandler={() => {
                            setResetConfirmation(false);
                        }}
                    />}
                <DarkModeToggle
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                />
                {/*<button*/}
                {/*    className="admin-modal-open"*/}
                {/*    onClick={() => {*/}
                {/*        setIsModalOpen(true)*/}
                {/*        document.body.classList.add("lock-scroll");*/}
                {/*    }*/}
                {/*    }*/}
                {/*>*/}
                {/*    Админ*/}
                {/*</button>*/}
                <button onClick={reset} className={resetConfirmed ? "reset spin-animation" : "reset"}>
                    <svg width="26px" height="26px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" stroke={darkMode ? '#fff' : '#000'} strokeLinecap="round"
                           strokeLinejoin="round" transform="matrix(0 1 1 0 2.5 2.5)">
                            <path
                                d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/>
                            <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"/>
                        </g>
                    </svg>
                </button>
                <AdminModal
                    isModalOpen={isModalOpen}
                    login={(event => {
                        login(event)
                    })}
                    logout={logout}
                    closeModal={() => {
                        setIsModalOpen(false);
                        document.body.classList.remove("lock-scroll");
                    }
                    }
                    isAdmin={isAdmin}
                    isLoginValid={isLoginValid}
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
                <div className={sideMenuOpen ? "overlay" : "overlay hidden"} onClick={toggleSideMenu}></div>
                <button className={sideMenuOpen ? "burger hidden" : "burger"} onClick={toggleSideMenu}></button>
                <div className="main-top">
                    {isManagerRich && <div className="wrapper">
                        <h1 className="title">Конверт</h1>
                        <input
                            type="number"
                            name="money"
                            onChange={handleAdditionalFieldsChange}
                            value={additionalFields.money}
                            className="tips-input"
                        />
                    </div>}
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
                    isManagerRich={isManagerRich}
                    handleIsManagerRichChange={handleIsManagerRichChange}
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
                        className="tooltip"
                    >
                        ?
                        <div className="tooltip-text">Без карт, они будут учтены и прибавлены
                            автоматически</div></div>
                </div>
                <button onClick={countWaiters} className="button count">Посчитать официантов</button>
            </div>
        </div>

    )
}

export default App;

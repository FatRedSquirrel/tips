import React from 'react';
import './App.css';
import Order from "./Components/Order";
import Preorder from "./Components/Preorder";

function App() {

    const [resultsShown, setResultsShown] = React.useState(false)

    //Массив с объектами банкетов
    const [feteData, setFeteData] = React.useState(JSON.parse(localStorage.getItem('fete')) || [{
        id: 1,
        preorder: '',
        order: ''
    }])

    //Объект прочих полей (конверт, посадка, с верхами ли менеджер)
    const [additionalFields, setAdditionalFields] = React.useState(JSON.parse(localStorage.getItem('additionalFields')) || {
        tables: '',
        money: '',
        isManagerRich: false
    })

    //Объект с результатами вычислений
    const [results, setResults] = React.useState({
        kitchen: 0,
        bar: 0,
        manager: 0
    })

    //Массив предзаказов
    const preorders = feteData.map((fete) =>
        <Preorder
            action={handleFeteChange}
            key={fete.id}
            id={fete.id}
            value={fete.preorder}
        />
    )

    //Массив дозаказов
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
    function count() {
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

    //Сохранение данных
    React.useEffect(() => {
        localStorage.setItem('fete', JSON.stringify(feteData));
        localStorage.setItem('additionalFields', JSON.stringify(additionalFields));
    }, [feteData, additionalFields]);

    return (
        <div className="main">
            <div className="main-top">
                <div className="wrapper">
                    <h1>Конверт</h1>
                    <input type="number" name="money" onChange={handleAdditionalFieldsChange}
                           value={additionalFields.money}/>
                </div>
                <div className="wrapper">
                    <h1>Посадка</h1>
                    <input type="number" name="tables" onChange={handleAdditionalFieldsChange}
                           value={additionalFields.tables}/>
                </div>
            </div>
            <div className="container">
                <div className="inputs-container">
                    <h1>Предзаказы</h1>
                    <ul>
                        {preorders}
                    </ul>
                </div>
                <div className="inputs-container">
                    <h1>Дозаказы</h1>
                    {orders}
                </div>
            </div>
            <button onClick={add} className="button">+</button>
            <button onClick={remove} className="button minus">-</button>
            <label>
                <input type="checkbox" name="isManagerRich" checked={additionalFields.isManagerRich}
                       onChange={handleAdditionalFieldsChange}/>
                Менеджер с верхами
            </label>
            <button onClick={count} className="button">Посчитать</button>
            <div className={resultsShown ? "results" : "results hidden"}>
                <p>кухня {results.kitchen}</p>
                <p>бар {results.bar}</p>
                <p>менеджер {results.manager}</p>
            </div>
        </div>
    )
}

export default App;

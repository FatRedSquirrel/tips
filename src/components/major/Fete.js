import React from 'react';
import Preorder from "../minor/Preorder";
import Order from "../minor/Order";

const Fete = ({fete, setFeteData}) => {


    // function handleFeteChange(evt) {
    //     const {id, value, name} = evt.target;
    //     setFeteData(prevFeteData => {
    //         let newFeteData = [];
    //         for (let i = 0; i < prevFeteData.length; i++) {
    //             let currentFete = prevFeteData[i];
    //             if (+id === currentFete.id) {
    //                 currentFete[name] = value;
    //             }
    //             newFeteData.push(currentFete);
    //         }
    //         return newFeteData;
    //     })
    // }

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

    //Массив элементов предзаказов
    const preorders = fete.map((fete) =>
        <Preorder
            key={fete.id}
            // id={fete.id}
            // value={fete.preorder}
            {...fete}
        />
    );

    //Массив элементов дозаказов
    const orders = fete.map((fete) =>
        <Order
            key={fete.id}
            // id={fete.id}
            // value={fete.order}
            {...fete}
        />
    );

    return (
        <>
            <div className="container">
                <div className="inputs-container">
                    <h1 className="title">Предзаказы</h1>
                    {preorders}
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
        </>

    );
};

export default Fete;
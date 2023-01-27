import React from 'react';
import Preorder from "../minor/Preorder";
import Order from "../minor/Order";
import {changeFeteData} from "../../redux/slices/fete";
import {useDispatch} from "react-redux";
import {FeteActionTypes} from "../../const";

const Fete = ({fete}) => {

    const dispatch = useDispatch();

    //Массив элементов предзаказов
    const preorders = fete.map((fete) =>
        <Preorder
            key={fete.id}
            {...fete}
        />
    );

    //Массив элементов дозаказов
    const orders = fete.map((fete) =>
        <Order
            key={fete.id}
            {...fete}
        />
    );

    const ordersContainerRef = React.useRef();

    function handleFeteButtonClick(type) {
        dispatch(changeFeteData({type}));
        ordersContainerRef.current.scrollTo({
            top: ordersContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <div ref={ordersContainerRef} className="orders-container">
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
                <button onClick={() => handleFeteButtonClick(FeteActionTypes.ADD)} className="button fete-button plus">+</button>
                <button onClick={() => handleFeteButtonClick(FeteActionTypes.REMOVE)} className="button fete-button minus">-</button>
            </div>
        </>

    );
};

export default Fete;
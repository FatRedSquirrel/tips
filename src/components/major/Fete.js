import React from 'react';
import Preorder from "../minor/Preorder";
import Order from "../minor/Order";
import {addFete, removeFete} from "../../redux/slices/fete";
import {useDispatch} from "react-redux";

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
                <button onClick={() => dispatch(addFete())} className="button fete-button plus">+</button>
                <button onClick={() => dispatch(removeFete())} className="button fete-button minus">-</button>
            </div>
        </>

    );
};

export default Fete;
import React from 'react';
import Preorder from "components/minor/Preorder";
import Order from "components/minor/Order";
import {changeFeteData} from "redux/slices/fete";
import {useDispatch, useSelector} from "react-redux";
import {FeteActionTypes} from "const";

import style from './index.module.scss';

const Fete = () => {

    const dispatch = useDispatch();
    const {fete} = useSelector(store => store.fete);
    const ordersContainerRef = React.useRef();

    //Массив элементов предзаказов
    const preorders = fete.map((fete) =>
        <Preorder key={fete.id}{...fete}/>
    );

    //Массив элементов дозаказов
    const orders = fete.map((fete) =>
        <Order key={fete.id}{...fete}/>
    );

    function handleFeteButtonClick(type) {
        dispatch(changeFeteData({type}));
        ordersContainerRef.current.scrollTo({
            top: ordersContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <div ref={ordersContainerRef}
                 className={style.ordersContainer}
            >
                <div className={style.inputsContainer}>
                    <h1 className="title">Предзаказы</h1>
                    {preorders}
                </div>
                <div className={style.inputsContainer}>
                    <h1 className="title">Дозаказы</h1>
                    {orders}
                </div>
            </div>
            <div className={style.feteButtons}>
                <button
                    onClick={() => handleFeteButtonClick(FeteActionTypes.ADD)}
                    className={style.feteButtons__button}
                >
                    +
                </button>
                <button
                    onClick={() => handleFeteButtonClick(FeteActionTypes.REMOVE)}
                    className={style.feteButtons__button}
                >
                    -
                </button>
            </div>
        </>
    );
};

export default Fete;
import React from 'react';
import WaiterChartItem from "components/minor/waiter/WaiterMain";
import {useSelector} from "react-redux";

import style from './index.module.scss';

const WaitersChart = () => {

    const {waiters} = useSelector(store => store.waiters);

    //Массив элементов выбранных официантов
    const chosenWaitersElements = waiters.filter(waiter => waiter.isChosen).map((chosenWaiter, index) =>
        <WaiterChartItem
            key={chosenWaiter.id}
            index={index + 1}
            {...chosenWaiter}
        />
    )

    return (
        <div className={style.waitersMain__container}>
            {waiters.filter(waiter => waiter.isChosen).length === 0 &&
                <p className={style.hint}>Добавьте официантов из бокового меню сюда</p>}
            {waiters.filter(waiter => waiter.isChosen).length !== 0 && <div className={style.waitersMain}>
                <header className={style.waitersMain__header}>
                    <span></span>
                    <span>Официант</span>
                    <span>Часы</span>
                    <span>На карте</span>
                    <span>К получению</span>
                </header>
                <div className={style.waitersMain__list}>
                    {chosenWaitersElements}
                </div>
            </div>}
        </div>
    );
};

export default WaitersChart;
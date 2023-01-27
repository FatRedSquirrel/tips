import React from 'react';
import WaiterChartItem from "../minor/waiter/WaiterChartItem";
import {useSelector} from "react-redux";

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
    );
};

export default WaitersChart;
import React from 'react';
import WaiterChartItem from "../minor/WaiterChartItem";

const WaitersChart = ({waiters, changeHours, handleHasMoneyChange, onCommentInput}) => {

    //Массив элементов выбранных официантов
    const chosenWaitersElements = waiters.filter(waiter => waiter.isChosen).map((chosenWaiter, index) =>
        <WaiterChartItem
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
import React from 'react';
import {checkIfAnyWaiterChosen, checkIfThereIsWaitersMoney} from "../../utils";
import {count} from "../../redux/slices/waiters";
import {useDispatch, useSelector} from "react-redux";
import {changeMainFields} from "../../redux/slices/mainFields";
import axios from "../../axios";

const WaitersMoney = ({showWarning}) => {

    const dispatch = useDispatch();
    const {waiters} = useSelector(store => store.waiters);
    const {mainFields} = useSelector(store => store.mainFields);

    function mainFieldsChangeHandler(event) {
        const {name, value} = event.target;
        dispatch(changeMainFields({name, value}))
    }

    function countWaiters() {
        if (!(checkIfAnyWaiterChosen(waiters) && checkIfThereIsWaitersMoney(mainFields))) {
            showWarning();
            return;
        }

        let waitersAmount = 0;
        for (let waiter of waiters) {
            if (waiter.isChosen) {
                waitersAmount += +waiter.hours / 12;
            }
        }

        //Прибавляем сумму верхов к чистым деньгам
        let waitersCards = 0;
        for (let waiter of waiters) {
            if (waiter.isChosen) {
                waitersCards += +waiter.hasMoney;
            }
        }

        const allTheMoney = +mainFields.waitersMoney + waitersCards;
        const tipsPerWaiter = allTheMoney / waitersAmount;
        dispatch(count(tipsPerWaiter));
        axios.post('/tips', {tips: Math.floor(tipsPerWaiter)});
    }

    return (
        <>
            <div className="waiters-money">
                <input
                    type="number"
                    placeholder="Деньги официантов"
                    className="waiters-money-input"
                    name="waitersMoney"
                    onChange={mainFieldsChangeHandler}
                    value={mainFields.waitersMoney}
                />
                <div
                    className="tooltip"
                >
                    ?
                    <div className="tooltip-text">Без карт, они будут учтены и прибавлены
                        автоматически</div></div>
            </div>
            <button onClick={countWaiters} className="button count">Посчитать официантов</button>
        </>
    );
};

export default WaitersMoney;

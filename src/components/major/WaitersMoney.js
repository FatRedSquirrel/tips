import React from 'react';
import {checkIfAnyWaiterChosen, checkIfThereIsWaitersMoney} from "../../utils";
import {count} from "../../redux/slices/waiters";
import {useDispatch} from "react-redux";
import {changeMainFields} from "../../redux/slices/mainFields";
import {hideWarning, showWarning} from "../../redux/slices/warning";

const WaitersMoney = ({waiters, mainFields}) => {

    const dispatch = useDispatch();

    function mainFieldsChangeHandler(event) {
        const {name, value} = event.target;
        dispatch(changeMainFields({name, value}))
    }

    function countWaiters() {
        if (!(checkIfAnyWaiterChosen(waiters) && checkIfThereIsWaitersMoney(mainFields))) {
            dispatch(showWarning());
            setTimeout(() => {
                dispatch(hideWarning())
            }, 2000);
            return;
        }
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
        const allTheMoney = Number(mainFields.waitersMoney) + waitersCards;
        const tipsPerWaiter = allTheMoney / waitersAmount;
        dispatch(count(tipsPerWaiter));
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
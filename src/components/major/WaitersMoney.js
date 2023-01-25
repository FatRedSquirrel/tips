import React from 'react';
import {checkIfAnyWaiterChosen, checkIfThereIsWaitersMoney} from "../../utils";
import {count} from "../../redux/slices/waiters";
import {useDispatch} from "react-redux";

const WaitersMoney = ({waiters, handleAdditionalFieldsChange, additionalFields, showWarning}) => {

    const dispatch = useDispatch();

    function countWaiters() {

        if (!(checkIfAnyWaiterChosen(waiters) && checkIfThereIsWaitersMoney(additionalFields))) {
            showWarning();
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

        const allTheMoney = Number(additionalFields.waitersMoney) + waitersCards;

        const tipsPerWaiter = allTheMoney / waitersAmount;

        dispatch(count(tipsPerWaiter))
        // setWaiters(prevState =>
        //     prevState.map(waiter => {
        //         if (waiter.isChosen) {
        //             return {
        //                 ...waiter,
        //                 toReceive: Math.floor(tipsPerWaiter * waiter.hours / 12 - waiter.hasMoney)
        //             }
        //         }
        //         return waiter;
        //     })
        // )
    }

    return (
        <>
            <div className="waiters-money">
                <input
                    type="number"
                    placeholder="Деньги официантов"
                    className="waiters-money-input"
                    name="waitersMoney"
                    onChange={handleAdditionalFieldsChange}
                    value={additionalFields.waitersMoney}
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
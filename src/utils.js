import {itemsNoReset} from "./const";

function checkIfThereIsDivisionsData(fete, mainFields) {
    return (fete.some(fete => fete.preorder || fete.order)) || mainFields.tables || mainFields.money;
}

function checkIfAnyWaiterChosen(waiters) {
    return waiters.some(waiter => waiter.isChosen);
}

function checkIfThereIsWaitersMoney(mainFields) {
    return mainFields.waitersMoney !== '';
}

function checkIfThereIsDataToReset(fete, mainFields, waiters) {
    return checkIfThereIsDivisionsData(fete, mainFields) || checkIfAnyWaiterChosen(waiters) || mainFields.waitersMoney;
}

function storage(item) {
    return JSON.parse(localStorage.getItem(item))
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function clearLocalStorage() {
    Object.keys({...localStorage}).forEach(key => {
        if (!itemsNoReset.includes(key)) {
            localStorage.removeItem(key);
        }
    })
}

export {checkIfThereIsDivisionsData, checkIfAnyWaiterChosen, checkIfThereIsWaitersMoney, checkIfThereIsDataToReset, storage, capitalizeWord, clearLocalStorage}

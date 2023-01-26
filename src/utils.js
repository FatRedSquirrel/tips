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
    return false
    // return JSON.parse(localStorage.getItem(item))
}

export {checkIfThereIsDivisionsData, checkIfAnyWaiterChosen, checkIfThereIsWaitersMoney, checkIfThereIsDataToReset, storage}

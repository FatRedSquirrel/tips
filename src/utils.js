function checkIfThereIsDivisionsData(feteData, additionalFields) {
    return (feteData.some(fete => fete.preorder || fete.order)) || additionalFields.tables || additionalFields.money;
}

function checkIfAnyWaiterChosen(waiters) {
    return waiters.some(waiter => waiter.isChosen);
}

function checkIfThereIsWaitersMoney(additionalFields) {
    return additionalFields.waitersMoney !== ''
}

function checkIfThereIsDataToReset(feteData, additionalFields, waiters) {
    return checkIfThereIsDivisionsData(feteData, additionalFields) || checkIfAnyWaiterChosen(waiters) || additionalFields.waitersMoney;
}

export {checkIfThereIsDivisionsData, checkIfAnyWaiterChosen, checkIfThereIsWaitersMoney, checkIfThereIsDataToReset}

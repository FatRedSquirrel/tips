const FeteActionTypes = {
    ENTER_NUMBERS: 'enterNumbers',
    ADD: 'add',
    REMOVE: 'remove'
}

const EmployeeMessage = {
    body: {
        adding: {
            SUCCESS: 'Сотрудник успешно добавлен!',
            ERROR: {
                DEFAULT: 'Не удалось добавить сотрудника',
                ALREADY_EXISTING: 'Сотрудник уже есть в базе'
            },
        },
        removing: {
            SUCCESS: 'Сотрудник успешно удален!',
            ERROR: 'Не удалось удалить сотрудника',
        }
    },
    status: {
        SUCCESS: 'success',
        ERROR: 'error',
    }

}

const waiterObj = {
    isChosen: false,
    hours: 12,
    hasMoney: 0,
    toReceive: 0,
    comment: '',
}

const itemsNoReset = ['darkMode', 'isAuth'];

export {FeteActionTypes, EmployeeMessage, waiterObj, itemsNoReset}
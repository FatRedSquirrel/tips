import {itemsNoReset} from "../const";

function storage(item) {
    return JSON.parse(localStorage.getItem(item))
}

function clearLocalStorage() {
    Object.keys({...localStorage}).forEach(key => {
        if (!itemsNoReset.includes(key)) {
            localStorage.removeItem(key);
        }
    })
}

export {storage, clearLocalStorage}
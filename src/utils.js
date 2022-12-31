import {data} from "./data";

function updateLocalStorageData() {
    const storedData = JSON.parse(localStorage.getItem("waiters")) ?? null;
    if (storedData) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name !== storedData[i].name) {
                storedData[i].name = data[i].name;
            }
        }
        localStorage.setItem('waiters', JSON.stringify(storedData));
    }
}

export {updateLocalStorageData}

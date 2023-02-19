import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import {storage} from "../../utils";
import {waiterObj} from "../../const";

function syncWithLocalStorage(data) {
    // проходимся по массиву, приходящему с базы
    // если в localStorage есть официант с совпадающим id
    // вернуть объект этого официанта со всеми данными из локал сторейджа
    // если такого официанта в localStorage нету, вернуть пустой initial объект с именем официанта

    const storedData = JSON.parse(localStorage.getItem('waiters'));

    return data.map(item => {
        const storedWaiter = storedData.find(waiter => waiter.id === item._id);
        if (storedWaiter) {
            return storedWaiter
        }
        return {
            ...waiterObj,
            id: item._id,
            name: item.name
        }
    }).sort((a, b) => a.name > b.name ? 1 : -1)
}

export const fetchWaiters = createAsyncThunk('waiters/fetchWaiters', async () => {
    const {data} = await axios.get('/waiters');
    return data;
});

const initialState = {
    waiters: storage('waiters') || [],
    isLoaded: false
}

const waitersSlice = createSlice({
    name: 'waiters',
    initialState,
    reducers: {
        chooseWaiter: (state, {payload: id}) => {
            state.waiters = state.waiters.map(waiter => waiter.id === id ? {
                ...waiter,
                isChosen: !waiter.isChosen
            } : waiter);
        },
        addComment: (state, {payload: {id, comment}}) => {
            const waiter = state.waiters.find(waiter => waiter.id === id);
            waiter.comment = comment;
        },
        selectHours: (state, {payload: {id, hours}}) => {
            const waiter = state.waiters.find(waiter => waiter.id === id);
            waiter.hours = hours;
        },
        toggleMoney: (state, {payload: {id, money}}) => {
            const waiter = state.waiters.find(waiter => waiter.id === id);
            waiter.hasMoney = money;
        },
        count: (state, {payload: tipsPerWaiter}) => {
            state.waiters = state.waiters.map(waiter =>
                waiter.isChosen
                    ? {
                        ...waiter,
                        toReceive: Math.floor(tipsPerWaiter * waiter.hours / 12 - waiter.hasMoney)
                    }
                    : waiter
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWaiters.fulfilled, (state, action) => {
                state.waiters = syncWithLocalStorage(action.payload)
                state.isLoaded = true
            })
    }
});

export const {chooseWaiter, addComment, selectHours, toggleMoney, count} = waitersSlice.actions;
export default waitersSlice.reducer;

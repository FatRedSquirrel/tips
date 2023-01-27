import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import {storage} from "../../utils";

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
            console.log(state.waiters)
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
                if (state.waiters.length !== action.payload.length) {
                    state.waiters = action.payload.map(waiter => ({
                        id: waiter._id,
                        name: waiter.name,
                        isChosen: false,
                        hours: 12,
                        hasMoney: 0,
                        toReceive: 0,
                        comment: '',
                    })).sort((a, b) => a.name > b.name ? 1 : -1);
                    state.isLoaded = true;
                } else {
                    state.isLoaded = true;
                }
            })
    }
});

export const {chooseWaiter, addComment, selectHours, toggleMoney, count} = waitersSlice.actions;
export default waitersSlice.reducer;
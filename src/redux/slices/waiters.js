import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchWaiters = createAsyncThunk('waiters/fetchWaiters', async () => {
    const {data} = await axios.get('/waiters');
    return data;
});

const initialState = {
    waiters: [],
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWaiters.pending, state => {
                state.isLoaded = false;
            })
            .addCase(fetchWaiters.fulfilled, (state, action) => {
                // здесь будем задавать waiters опционально, учитывая localStorage
                state.waiters = action.payload.map(runner => ({
                    id: runner._id,
                    name: runner.name,
                    isChosen: false,
                    hours: 12,
                    hasMoney: 0,
                    toReceive: 0,
                    comment: '',
                }));
                state.isLoaded = true;
            })
            .addCase(fetchWaiters.rejected, state => {
                state.waiters = [];
                state.isLoaded = false;
            })
    }
});

export const {chooseWaiter, addComment, selectHours, toggleMoney, count} = waitersSlice.actions;
export default waitersSlice.reducer;
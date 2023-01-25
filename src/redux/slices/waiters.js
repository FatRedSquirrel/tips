import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchWaiters = createAsyncThunk('waiters/fetchWaiters', async () => {
    const {data} = await axios.get('/waiters');
    return data;
});

const initialState = {
    waiters: [],
    status: 'loading'
}

const waitersSlice = createSlice({
    name: 'waiters',
    initialState,
    reducers: {
        chooseWaiter: (state, action) => {
            const id = action.payload;
            state.waiters = state.waiters.map(waiter => waiter.id === id ? {
                ...waiter,
                isChosen: !waiter.isChosen
            } : waiter);
        }
    },
    extraReducers: {
        [fetchWaiters.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchWaiters.fulfilled]: (state, action) => {
            state.waiters = action.payload.map(runner => ({
                id: runner._id,
                name: runner.name,
                isChosen: false,
                hours: 12,
                hasMoney: 0,
                toReceive: 0,
                comment: '',
            }));
            state.status = 'loaded';
        },
        [fetchWaiters.rejected]: (state) => {
            state.waiters = [];
            state.status = 'error';
        },
    }
});

export const {chooseWaiter} = waitersSlice.actions;

export const waitersReducer = waitersSlice.reducer;
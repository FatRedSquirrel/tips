import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import {nanoid} from "nanoid";

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
    reducers: {},
    extraReducers: {
        [fetchWaiters.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchWaiters.fulfilled]: (state, action) => {
            state.waiters = action.payload.map(runner => ({
                id: nanoid(),
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

export const waitersReducer = waitersSlice.reducer;
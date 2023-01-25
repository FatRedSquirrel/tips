import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
    data: null,
    isLoaded: false
}

export const fetchAdminData = createAsyncThunk('fetchAdminData', async (params) => {
    const {data} = await axios.post('/login', params);
    return data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoaded = true;
            })
    }
});

export default authSlice.reducer;
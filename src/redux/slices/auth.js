import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";
import {storage} from "../../utils";

const initialState = {
    data: storage('isAuth') || null,
    error: null,
    isLoaded: false
}

export const fetchAdminData = createAsyncThunk('fetchAdminData', async (params) => {
    const {data} = await axios.post('/login', params);
    return data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                if (!state.data) {
                    state.data = action.payload;
                }
                state.error = null;
                state.isLoaded = true;
            })
            .addCase(fetchAdminData.rejected, (state, action) => {
                state.error = 'Не удалось авторизоваться';
                console.log(`Error: ${action.error.message}`);
            })
    }
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;
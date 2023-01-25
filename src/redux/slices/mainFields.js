import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tables: '',
    money: '',
    waitersMoney: ''
};

const mainFieldsSlice = createSlice({
    name: 'mainFields',
    initialState,
    reducers: {
        changeMainFields: (state, {payload: {name, value}}) => {
            state[name] = value;
        }
    }
});

export const {changeMainFields} = mainFieldsSlice.actions;
export const mainFieldsReducer = mainFieldsSlice.reducer;
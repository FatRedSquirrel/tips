import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mainFields: {
        tables: '',
        money: '',
        waitersMoney: ''
    }
};

const mainFieldsSlice = createSlice({
    name: 'mainFields',
    initialState,
    reducers: {
        changeMainFields: (state, {payload: {name, value}}) => {
            state.mainFields[name] = value;
        }
    }
});

export const {changeMainFields} = mainFieldsSlice.actions;
export default mainFieldsSlice.reducer;
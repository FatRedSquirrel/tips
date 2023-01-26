import {createSlice} from "@reduxjs/toolkit";
import {storage} from "../../utils";

const initialState = {
    mainFields: storage('mainFields') || {
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
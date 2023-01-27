import {createSlice} from "@reduxjs/toolkit";
import {storage} from "../../utils";

const initialState = {
    mainFields: storage('mainFields') || {
        tables: '',
        money: '',
        waitersMoney: '',
        isManagerRich: false
    }
};

const mainFieldsSlice = createSlice({
    name: 'mainFields',
    initialState,
    reducers: {
        changeMainFields: (state, {payload: {name, value, type, checked}}) => {
            state.mainFields[name] = type === 'checkbox' ? checked : value;
        }
    }
});

export const {changeMainFields} = mainFieldsSlice.actions;
export default mainFieldsSlice.reducer;
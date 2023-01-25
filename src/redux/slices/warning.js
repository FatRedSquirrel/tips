import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isWarningShown: false
};

const warningSlice = createSlice({
    name: 'warning',
    initialState,
    reducers: {
        showWarning: (state) => {
            state.isWarningShown = true;
        },
        hideWarning: (state) => {
            state.isWarningShown = false;
        }
    }
});

export const {showWarning, hideWarning} = warningSlice.actions;
export default warningSlice.reducer;
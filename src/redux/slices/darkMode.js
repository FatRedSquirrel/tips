import {createSlice} from "@reduxjs/toolkit";
import {storage} from "helpers/storage";

const initialState = {
    darkMode: storage('darkMode') || false
}

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
    }
});

export const {toggleDarkMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;
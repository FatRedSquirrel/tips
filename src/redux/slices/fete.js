import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        preorder: '',
        order: ''
    },
]

const feteSlice = createSlice({
    name: 'fete',
    initialState,
    reducers: {
        changeFeteData: (state, {payload: {id, name, value}}) => {
            state = state.map(fete => fete.id === id ? {...fete, [name]: value} : fete);
        }
    }
})

export const {changeFeteData} = feteSlice.actions;
export const feteReducer = feteSlice.reducer;
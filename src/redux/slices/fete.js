import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fete: [
        {
            id: 1,
            preorder: '',
            order: ''
        }
    ]
}

const feteSlice = createSlice({
    name: 'fete',
    initialState,
    reducers: {
        changeFeteData: (state, {payload: {id, name, value}}) => {
            state.fete = state.fete.map(fete => fete.id == id ? {...fete, [name]: value} : fete);
        },
        addFete: (state, action) => {
            state.fete.push({...initialState.fete[0], id: state.fete.length + 1})
        },
        removeFete: (state) => {
            state.fete.pop();
        },
    }
});

export const {changeFeteData, addFete, removeFete} = feteSlice.actions;
export default feteSlice.reducer;
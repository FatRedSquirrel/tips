import {createSlice} from "@reduxjs/toolkit";
import {storage} from "helpers/storage";
import {FeteActionTypes} from "const";

const initialState = {
    fete: storage('fete') || [
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
        changeFeteData: (state, {payload: {id, name, value, type}}) => {
            switch (type) {
                case FeteActionTypes.ENTER_NUMBERS:
                    state.fete = state.fete.map(fete => fete.id == id ? {...fete, [name]: value} : fete);
                    break;
                case FeteActionTypes.ADD:
                    state.fete.push({...initialState.fete[0], id: state.fete.length + 1})
                    break;
                case FeteActionTypes.REMOVE:
                    state.fete.pop();
                    break;
                default:
                    state.fete = [];
            }
        },
    }
});

export const {changeFeteData} = feteSlice.actions;
export default feteSlice.reducer;
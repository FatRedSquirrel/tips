import React from "react";
import {changeFeteData} from "redux/slices/fete";
import {useDispatch} from "react-redux";
import {FeteActionTypes} from "const";

import style from './index.module.scss';

export default function Preorder({id, preorder}) {

    const dispatch = useDispatch();

    function feteChangeHandler(event) {
        const {id, name, value} = event.target;
        dispatch(changeFeteData({id, name, value, type: FeteActionTypes.ENTER_NUMBERS}));
    }

    return (
        <div className={style.fete}>
            <span>{id}</span>
            <input
                type="number"
                id={id}
                name="preorder"
                onChange={feteChangeHandler}
                value={preorder}/>
        </div>
    )
}

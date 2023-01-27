import React from "react";
import {useDispatch} from "react-redux";
import {changeFeteData} from "../../redux/slices/fete";
import {FeteActionTypes} from "../../const";

export default function Order({id, order}) {

    const dispatch = useDispatch();

    function feteChangeHandler(event) {
        const {id, name, value} = event.target;
        dispatch(changeFeteData({id, name, value, type: FeteActionTypes.ENTER_NUMBERS}));
    }

    return (
        <div className="fete">
            <span>{id}</span>
            <input
                onBlur={() => window.scrollTo({top: 0})}
                className="tips-input fete-input"
                type="number"
                id={id}
                name="order"
                onChange={feteChangeHandler}
                value={order}/>
        </div>
    )
}

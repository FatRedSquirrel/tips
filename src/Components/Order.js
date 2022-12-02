import React from "react";

export default function Order(props) {
    return (
        <div className="fete">
            <span>{props.id}</span>
            <input
                className="tips-input fete-input"
                type="number"
                id={props.id}
                name="order"
                onChange={props.action}
                value={props.value}/>
        </div>
    )
}

import React from "react";

export default function Preorder(props) {
    return (
        <div className="fete">
            <span>{props.id}</span>
            <input
                type="number"
                id={props.id}
                name="preorder"
                onChange={props.action}
                value={props.value}/>
        </div>
    )
}

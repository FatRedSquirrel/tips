import React from "react";

export default function WarningMessage(props) {
    return (
        <div className={props.isShown ? "warning-message shown" : "warning-message"}>
            Нет данных
        </div>
    )
}

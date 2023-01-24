import React from "react";

export default function IsManagerRich(props) {

    const styles = props.isManagerRich ?
        {
            opacity: 1,
            color: props.darkMode ? "#fff" : "#000",
            border: `2px solid ${props.darkMode ? '#BB86FC' : '#13b413'}`
        }
        :
        {
            opacity: 0.3,
            color: "#5e5858",
            border: "2px solid #757070"
        }

    return (
        <label style={styles} className="is-manager-rich-label">
            <input
                type="checkbox"
                name="isManagerRich"
                checked={props.isManagerRich}
                onChange={props.handleIsManagerRichChange}
                hidden
            />
            Менеджер с верхами
        </label>
    )
}

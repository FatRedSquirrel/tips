import React from "react";
import {useSelector} from "react-redux";

export default function IsManagerRich(props) {

    const {darkMode} = useSelector(store => store.darkMode);

    const styles = props.isManagerRich ?
        {
            opacity: 1,
            color: darkMode ? "#fff" : "#000",
            border: `2px solid ${darkMode ? '#BB86FC' : '#13b413'}`
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

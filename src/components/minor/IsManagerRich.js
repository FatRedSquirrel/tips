import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeMainFields} from "../../redux/slices/mainFields";

export default function IsManagerRich() {

    const {darkMode} = useSelector(store => store.darkMode);
    const {isManagerRich} = useSelector(store => store.mainFields.mainFields);
    const dispatch = useDispatch();

    const styles = isManagerRich ? {
            opacity: 1,
            color: darkMode ? "#fff" : "#000",
            border: `2px solid ${darkMode ? '#BB86FC' : '#13b413'}`
        } :
        {
            opacity: 0.3,
            color: "#5e5858",
            border: "2px solid #757070"
        };

    function handleIsManagerRichChange(event) {
        const {name, type, checked} = event.target;
        dispatch(changeMainFields({name, type, checked}));
    }

    return (
        <label style={styles} className="is-manager-rich-label">
            <input
                type="checkbox"
                name="isManagerRich"
                checked={isManagerRich}
                onChange={handleIsManagerRichChange}
                hidden
            />
            Менеджер с верхами
        </label>
    )
}

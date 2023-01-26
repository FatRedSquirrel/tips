import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleDarkMode} from "../../redux/slices/darkMode";

export default function DarkModeToggle() {
    const dispatch = useDispatch();
    const {darkMode} = useSelector(store => store.darkMode);

    return (
        <div className="dark-mode">
            <input
                onChange={() => dispatch(toggleDarkMode())}
                className="dark-mode-input"
                type="checkbox"
                id="dark-mode-toggle"
                name="dark-mode"
                checked={darkMode}
                hidden
            />
            <label htmlFor="dark-mode-toggle" className="dark-mode-label">
                <div className="dark-mode-circle"></div>
            </label>
        </div>
    )
}

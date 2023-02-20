import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleDarkMode} from "redux/slices/darkMode";

import style from './index.module.scss';

export default function DarkModeToggle() {
    const dispatch = useDispatch();
    const {darkMode} = useSelector(store => store.darkMode);

    return (
        <div className={style.darkMode}>
            <input
                onChange={() => dispatch(toggleDarkMode())}
                className={style.darkMode__input}
                type="checkbox"
                id="dark-mode-toggle"
                name="dark-mode"
                checked={darkMode}
                hidden
            />
            <label
                htmlFor="dark-mode-toggle"
                className={style.darkMode__label}
            >
                <div className={style.darkMode__circle}></div>
            </label>
        </div>
    )
}

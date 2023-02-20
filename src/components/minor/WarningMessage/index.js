import React from "react";

import classNames from 'helpers/classNames';
import style from './index.module.scss';

export default function WarningMessage(props) {
    return (
        <div
            className={props.isShown ?
                classNames(style.warningMessage, style.warningMessage__shown) :
                style.warningMessage
            }
        >
            {props.children}
        </div>
    )
}

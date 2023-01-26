import React from 'react';
import Modal from "../minor/Modal";
import {checkIfThereIsDataToReset} from "../../utils";
import Reset from "../../icons/Reset";

const Header = ({waiters, fete, mainFields}) => {

    const [resetConfirmation, setResetConfirmation] = React.useState(false);
    const [resetConfirmed, setResetConfirmed] = React.useState(false);

    const itemsNoReset = ['darkMode'];

    function reset() {
        setResetConfirmation(false);
        setResetConfirmed(true); //start spin animation on reset button
        setTimeout(() => { //clear data and reload page after animation is finished
            clearLocalStorage();
            document.location.reload();
        }, 300);
    }

    function clearLocalStorage() {
        Object.keys({...localStorage}).forEach(key => {
            if (!itemsNoReset.includes(key)) {
                localStorage.removeItem(key);
            }
        })
    }

    return (
        <>
            {resetConfirmation &&
                <Modal
                    text="Вы уверены, что хотите сделать сброс? Все сохраненные данные будут удалены"
                    onConfirm={reset}
                    onCancel={() => setResetConfirmation(false)}
                />
            }
            {checkIfThereIsDataToReset(fete, mainFields, waiters) &&
                <button
                    onClick={() => setResetConfirmation(true)}
                    className={resetConfirmed ? "reset spin-animation" : "reset"}
                >
                    <Reset/>
                </button>
            }
        </>
    );
};

export default Header;
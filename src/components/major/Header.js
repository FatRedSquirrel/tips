import React from 'react';
import ResetConfirmationModal from "../minor/ResetConfirmationModal";
import DarkModeToggle from "../minor/DarkModeToggle";
import {checkIfThereIsDataToReset} from "../../utils";
import ResetButton from "../minor/ResetButton";

const Header = ({waiters, feteData, additionalFields, darkMode, toggleDarkMode}) => {

    const [resetConfirmation, setResetConfirmation] = React.useState(false);
    const [resetConfirmed, setResetConfirmed] = React.useState(false);

    const itemsNoReset = ['darkMode'];

    function reset() {
        setResetConfirmation(false); //close modal
        setResetConfirmed(true); //start spin animation on reset button
        setTimeout(() => { // clear data and reload page after animation is finished
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
                <ResetConfirmationModal
                    resetButtonClickHandler={reset}
                    cancelButtonClickHandler={() => {
                        setResetConfirmation(false);
                    }}
                />}
            <DarkModeToggle
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
            />
            {checkIfThereIsDataToReset(feteData, additionalFields, waiters) &&
                <ResetButton
                    onClick={() => setResetConfirmation(true)}
                    resetConfirmed={resetConfirmed}
                    darkMode={darkMode}
                />
            }
        </>
    );
};

export default Header;
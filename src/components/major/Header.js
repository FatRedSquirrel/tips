import React from 'react';
import Modal from "../minor/Modal";
import DarkModeToggle from "../minor/DarkModeToggle";
import {checkIfThereIsDataToReset} from "../../utils";
import ResetIcon from "../../icons/ResetIcon";
import {openModal, closeModal} from "../../redux/slices/modal";
import {useSelector, useDispatch} from "react-redux";

const Header = ({waiters, fete, mainFields, darkMode, toggleDarkMode}) => {

    const dispatch = useDispatch();
    const {isOpen} = useSelector(store => store.modal);
    const [resetConfirmed, setResetConfirmed] = React.useState(false);

    const itemsNoReset = ['darkMode'];

    function reset() {
        dispatch(closeModal());
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
            {isOpen &&
                <Modal
                    text="Вы уверены, что хотите сделать сброс? Все сохраненные данные будут удалены"
                    onConfirm={reset}
                    onCancel={() => dispatch(closeModal())}
                />
            }
            <DarkModeToggle
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
            />
            {checkIfThereIsDataToReset(fete, mainFields, waiters) &&
                <button
                    onClick={() => dispatch(openModal())}
                    className={resetConfirmed ? "reset spin-animation" : "reset"}
                >
                    <ResetIcon darkMode={darkMode}/>
                </button>
            }
        </>
    );
};

export default Header;
import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const NewEmployee = ({showConfirm, onNameChange, name}) => {

    const {data: isAuth} = useSelector(store => store.auth);
    const [inputShown, setInputShown] = React.useState(false);

    return !isAuth ? <Navigate to="/login"/> : (
        <div className="new-employee-form">
            {inputShown &&
                <input
                    type="text"
                    placeholder="Введите имя"
                    name="name"
                    value={name}
                    onChange={onNameChange}
                />
            }
            {inputShown &&
                <button
                    type="button"
                    onClick={showConfirm}
                >Добавить</button>
            }
            {!inputShown && <button onClick={() => setInputShown(true)} type="button">+ Новый официант</button>}
        </div>
    );
};

export default NewEmployee;
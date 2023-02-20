import React from 'react';
import style from './index.module.scss';

const NewEmployee = ({showConfirm, onNameChange, name}) => {

    const [inputShown, setInputShown] = React.useState(false);

    return (
        <form className={style.newEmployeeForm}>
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
                    disabled={name === ''}
                >Добавить</button>
            }
            {!inputShown && <button onClick={() => setInputShown(true)} type="button">+ Новый сотрудник</button>}
        </form>
    );
};

export default NewEmployee;
import React from 'react';

const NewEmployee = ({showConfirm, onNameChange, name}) => {

    const [inputShown, setInputShown] = React.useState(false);

    return (
        <form className="new-employee-form">
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
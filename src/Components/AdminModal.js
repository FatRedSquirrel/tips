import React from "react";
import close from "../images/close.svg"

export default function AdminModal(props) {

    const styles = {
        display: props.isModalOpen ? "flex" : "none"
    }

    return (
        <div className="admin-modal" style={styles}>
            <form
                onSubmit={props.login}
                className="admin-modal-form"
            >
                {!props.isAdmin && <div className="admin-modal-login-container">
                    <input
                        className={`admin-modal-input ${props.isLoginValid ? '' : 'invalid'}`}
                        type="text"
                        placeholder="Пароль"
                    />
                    <button
                        className="admin-modal-login"
                        type="submit"
                    >
                        Войти
                    </button>
                </div>}
                {props.isAdmin && <div className="admin-modal-login-container">
                    <p>Вы авторизованы как админ</p>
                    <button
                        onClick={props.logout}
                        className="admin-modal-login"
                        type="button"
                    >
                        Выйти
                    </button>
                </div>}
                <button
                    onClick={props.closeModal}
                    className="admin-modal-close"
                    type="button"
                >
                    <img src={close}/>
                </button>
            </form>

        </div>
    )
}

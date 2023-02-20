import style from './index.module.scss';
import classNames from "helpers/classNames";

export default function Modal({text, onConfirm, onCancel}) {
    return (
        <div className={style.modal}>
            <div className={style.modal__inner}>
                <h2>{text}</h2>
                <div className={style.buttons}>
                    <button
                        type="button"
                        className={style.modalButton}
                        onClick={onConfirm}
                    >Подтвердить</button>
                    <button
                        type="button"
                        className={classNames(style.modalButton, style.modalButton__cancel)}
                        onClick={onCancel}
                    >Отмена</button>
                </div>
            </div>
        </div>
    )
}

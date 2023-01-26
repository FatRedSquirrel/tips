export default function Modal({text, onConfirm, onCancel}) {
    return (
        <div className='modal'>
            <div className='modal-inner'>
                <h2>{text}</h2>
                <div className="buttons">
                    <button
                        type="button"
                        className="modal-button modal-button-confirm"
                        onClick={onConfirm}
                    >Подтвердить</button>
                    <button
                        type="button"
                        className="modal-button modal-button-cancel"
                        onClick={onCancel}
                    >Отмена</button>
                </div>
            </div>
        </div>
    )
}

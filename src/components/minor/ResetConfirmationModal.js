export default function ResetConfirmationModal(props) {
    return (
        <div className='modal'>
            <div className='reset-confirmation'>
                <h2>Вы уверены, что хотите сделать сброс? Все сохраненные данные будут удалены</h2>
                <div className="buttons">
                    <button className="reset-button" onClick={props.resetButtonClickHandler}>Сбросить</button>
                    <button className="cancel-button" onClick={props.cancelButtonClickHandler}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

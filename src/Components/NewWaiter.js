export default function ({addNewWaiter}) {
    return (
        <div className="new-waiter">
            <h2 className="new-waiter-title">Добавить официанта</h2>
            <form onSubmit={addNewWaiter} className="new-waiter-form">
                <input className="new-waiter-input" type="text" placeholder="Имя"/>
                <button className="new-waiter-button" type="submit">+</button>
            </form>
        </div>
    )
}

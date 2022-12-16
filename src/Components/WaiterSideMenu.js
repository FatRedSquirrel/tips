import close from "../images/close.svg"

export default function WaiterSideMenu(props) {

    const styles = {
        backgroundColor: props.isChosen ? "#cacacc" : "transparent"
    }

    return (
        <div
            style={styles}
            className="waiter-side-menu"
            onClick={props.chooseWaiter}
        >
            <label className="waiter-side-menu__label">
                <input type="checkbox" hidden/>
                <p className="waiter-side-menu__name">{props.name}</p>
                {props.isWaiterRemovalInProcess &&
                    <button
                        onClick={props.deleteWaiter}
                        className="waiter-side-menu__delete"
                    >
                        <img src={close}/>
                    </button>}
            </label>
        </div>
    )
}

import {useDispatch} from "react-redux";
import {chooseWaiter} from "../../redux/slices/waiters";

export default function WaiterSideMenu(props) {

    const dispatch = useDispatch()

    const styles = {
        backgroundColor: props.isChosen ? "#cacacc" : "transparent"
    }

    return (
        <div
            style={styles}
            className="waiter-side-menu"
            onClick={() => {
                dispatch(chooseWaiter(props.id))
            }}
        >
            <label className="waiter-side-menu__label">
                <input type="checkbox" hidden/>
                <p className="waiter-side-menu__name">{props.name}</p>
            </label>
        </div>
    )
}

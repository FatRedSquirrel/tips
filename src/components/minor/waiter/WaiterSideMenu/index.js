import {useDispatch} from "react-redux";
import {chooseWaiter} from "redux/slices/waiters";

import style from './index.module.scss';

export default function WaiterSideMenu(props) {

    const dispatch = useDispatch()

    const styles = {
        backgroundColor: props.isChosen ? "#cacacc" : "transparent"
    }

    return (
        <div
            style={styles}
            className={style.waiterSideMenu}
            onClick={() => {
                dispatch(chooseWaiter(props.id))
            }}
        >
            <label className={style.waiterSideMenu__label}>
                <input
                    type="checkbox"
                    hidden
                />
                <p>{props.name}</p>
            </label>
        </div>
    )
}

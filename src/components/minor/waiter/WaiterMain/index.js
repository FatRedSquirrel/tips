import {useState} from "react";
import {addComment, selectHours, toggleMoney} from "redux/slices/waiters";
import {useDispatch} from "react-redux";

import style from './index.module.scss';
import classNames from "helpers/classNames";

export default function WaiterChartItem(
    {
        index,
        id,
        comment,
        name,
        hasMoney,
        toReceive,
        hours,
    }
) {

    const dispatch = useDispatch();
    const [commentShown, setCommentShown] = useState(false);

    return (
        <div className={style.waiterMain}>
            {commentShown && <div className={style.waiterMain__comment}>
                <input
                    onChange={(event) => dispatch(addComment({id, comment: event.target.value}))}
                    type="text"
                    placeholder="Сюда можно ввести комментарий"
                    value={comment}
                />
            </div>}
            <div className={style.waiterMain__number}>{index}</div>
            <div className={style.waiterMain__name}>
                {name}
            </div>
            <div className={style.waiterMain__hours}>
                <select
                    name="hours"
                    value={hours}
                    onChange={(event) => dispatch(selectHours({id, hours: event.target.value}))}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div className={style.waiterMain__has}>
                <input
                    type="number"
                    className={style.amount}
                    value={hasMoney}
                    onChange={(event) => dispatch(toggleMoney({id, money: event.target.value}))}
                />
            </div>
            <div className={style.toReceive}>
                {toReceive}
            </div>
            <div className={classNames(style.tooltip, "tooltip")}
                 onClick={() => setCommentShown(prev => !prev)}
            >
                ?
            </div>
        </div>
    )
}

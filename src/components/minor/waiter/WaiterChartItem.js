import {useState} from "react";
import {addComment, selectHours, toggleMoney} from "../../../redux/slices/waiters";
import {useDispatch} from "react-redux";

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
        <div className="waiter-main">
            {commentShown && <div className="waiter-main__comment">
                <input
                    onChange={(event) => dispatch(addComment({id, comment: event.target.value}))}
                    type="text"
                    placeholder="Сюда можно ввести комментарий"
                    value={comment}
                />
            </div>}
            <div className="waiter-main__text waiter-main__number">{index}</div>
            <div className="waiter-main__text waiter-main__name">
                {name}
            </div>
            <div className="waiter-main__text waiter-main__hours">
                <select
                    name="hours" className="hours-select"
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
            <div className="waiter-main__text waiter-main__has">
                <input
                    type="number"
                    className="waiter-main__has-amount"
                    value={hasMoney}
                    onChange={(event) => dispatch(toggleMoney({id, money: event.target.value}))}
                />
            </div>
            <div className="to-receive">
                {toReceive}
            </div>
            <div className="tooltip" onClick={() => setCommentShown(prev => !prev)}>?
            </div>
        </div>
    )
}

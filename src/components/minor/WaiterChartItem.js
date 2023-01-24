import {useState} from "react";

export default function WaiterChartItem(props) {

    const [commentShown, setCommentShown] = useState(false);

    return (
        <div className="waiter-main">
            {commentShown && <div className="waiter-main__comment">
                <input onChange={props.onCommentInput} type="text" placeholder="Сюда можно ввести комментарий" value={props.comment}/>
            </div>}
            <div className="waiter-main__text waiter-main__number">{props.index}</div>
            <div className="waiter-main__text waiter-main__name">
                {props.name}
            </div>
            <div className="waiter-main__text waiter-main__hours">
                <select name="hours" className="hours-select" value={props.hours} onChange={props.changeHours}>
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
                    onChange={props.handleHasMoneyChange}
                    type="number"
                    className="waiter-main__has-amount"
                    value={props.hasMoney}
                />
            </div>
            <div className="to-receive">
                {props.toReceive}
            </div>
            <div className="tooltip" onClick={() => setCommentShown(prev => !prev)}>?
            </div>
        </div>
    )
}

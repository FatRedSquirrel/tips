export default function WaiterMain(props) {

    // const bankStyles = {
    //     color: props.bank === "Сбербанк" ? "#13b413" : "#f8d81c"
    // }

    return (
        <div className="waiter-main">
            <div className="waiter-main__text waiter-main__number">{props.index}</div>
            <div className="waiter-main__text waiter-main__name">
                {/*<div className="tooltip">*/}
                {/*    ?*/}
                {/*    <div className="tooltip-text">*/}
                {/*        <div className="bank" style={bankStyles}>{props.bank}</div>*/}
                {/*        <div className="phone-number"><a onClick={(evt) => evt.preventDefault()} href="#">{props.phoneNumber}</a></div>*/}
                {/*    </div>*/}
                {/*</div>*/}
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
                (
                <div className="select-container">
                    <select name="hasMoney" className="money-type-select">
                        <option value="tables">посадка</option>
                        <option value="service">сервак</option>
                        <option value="tips">верха</option>
                    </select>
                </div>
                )
            </div>
            <div className="to-receive">
                {props.toReceive}
            </div>
        </div>
    )
}

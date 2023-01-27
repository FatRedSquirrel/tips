import React from 'react';
import IsManagerRich from "../minor/IsManagerRich";
import {useDispatch, useSelector} from "react-redux";
import {changeMainFields} from "../../redux/slices/mainFields";

const EnvelopeLanding = () => {

    const dispatch = useDispatch();

    const {isManagerRich} = useSelector(store => store.mainFields.mainFields);
    const {mainFields} = useSelector(store => store.mainFields);

    function mainFieldsChangeHandler(event) {
        const {name, value} = event.target;
        dispatch(changeMainFields({name, value}))
    }

    return (
        <div className="main-top">
            <div className="main-top__container">
                {isManagerRich && <div className="wrapper">
                    <h1 className="title">Конверт</h1>
                    <input
                        type="number"
                        name="money"
                        onChange={mainFieldsChangeHandler}
                        value={mainFields.money}
                        className="tips-input"
                    />
                </div>}
                <div className="wrapper">
                    <h1 className="title">Посадка</h1>
                    <input
                        type="number"
                        name="tables"
                        onChange={mainFieldsChangeHandler}
                        value={mainFields.tables}
                        className="tips-input"
                    />
                </div>
            </div>
            <IsManagerRich/>
        </div>
    );
};

export default EnvelopeLanding;
import React from 'react';
import IsManagerRich from "components/minor/IsManagerRich";
import {useDispatch, useSelector} from "react-redux";
import {changeMainFields} from "redux/slices/mainFields";

import style from './index.module.scss';

const EnvelopeLanding = () => {

    const dispatch = useDispatch();

    const {isManagerRich} = useSelector(store => store.mainFields.mainFields);
    const {mainFields} = useSelector(store => store.mainFields);

    function mainFieldsChangeHandler(event) {
        const {name, value} = event.target;
        dispatch(changeMainFields({name, value}))
    }

    return (
        <div className={style.mainTop}>
            <div className={style.mainTop__container}>
                {isManagerRich && <div className={style.mainTop__wrapper}>
                    <h1 className="title">Конверт</h1>
                    <input
                        type="number"
                        name="money"
                        onChange={mainFieldsChangeHandler}
                        value={mainFields.money}
                    />
                </div>}
                <div className={style.mainTop__wrapper}>
                    <h1 className="title">Посадка</h1>
                    <input
                        type="number"
                        name="tables"
                        onChange={mainFieldsChangeHandler}
                        value={mainFields.tables}
                    />
                </div>
            </div>
            <IsManagerRich/>
        </div>
    );
};

export default EnvelopeLanding;
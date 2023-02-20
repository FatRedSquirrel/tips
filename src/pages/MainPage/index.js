import React from 'react';
import {useSelector} from 'react-redux';

import WarningMessage from 'components/minor/WarningMessage';
import Results from "components/major/Results/Results";
import SideMenu from "components/major/SideMenu";
import WaitersChart from "components/major/WaitersChart";
import EnvelopeLanding from "components/major/EnvelopeLanding";
import Fete from "components/major/Fete";
import WaitersMoney from "components/major/WaitersMoney";
import Header from "components/major/Header";
import Loader from "components/UI/Loader";

import style from './index.module.scss';

function MainPage() {

    const {isLoaded: isWaitersLoaded} = useSelector(store => store.waiters);
    const [warning, setWarning] = React.useState(false);

    function showWarning() {
        setWarning(true);
        setTimeout(() => {
            setWarning(false)
        }, 2000);
    }

    return !isWaitersLoaded ? <Loader/> : (
        <div>
            <SideMenu/>
            <div className={style.main}>
                <Header/>
                <WaitersChart/>
                <EnvelopeLanding/>
                <Fete/>
                <Results showWarning={showWarning}/>
                <WaitersMoney showWarning={showWarning}/>
            </div>
            <WarningMessage isShown={warning}>Нет данных</WarningMessage>
        </div>
    )
}

export default MainPage;

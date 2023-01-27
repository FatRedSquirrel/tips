import React from 'react';
import WarningMessage from '../components/minor/WarningMessage';
import Results from "../components/major/Results";
import SideMenu from "../components/major/SideMenu";
import WaitersChart from "../components/major/WaitersChart";
import EnvelopeLanding from "../components/major/Envelope-Landing";
import Fete from "../components/major/Fete";
import WaitersMoney from "../components/major/WaitersMoney";
import Header from "../components/major/Header";
import Loading from "../components/minor/Loading";

import {useSelector} from 'react-redux';

function Home() {

    const {isLoaded: isWaitersLoaded} = useSelector(store => store.waiters);
    const {isWarningShown} = useSelector(store => store.warning);

    return !isWaitersLoaded ? <Loading/> : (
        <div className="home">
            <SideMenu/>
            <div className="main">
                <Header/>
                <WaitersChart/>
                <EnvelopeLanding/>
                <Fete/>
                <Results/>
                <WaitersMoney/>
            </div>
            <WarningMessage isShown={isWarningShown}>Нет данных</WarningMessage>
        </div>
    )
}

export default Home;
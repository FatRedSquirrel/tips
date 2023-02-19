import React from 'react';
import WarningMessage from '../components/minor/WarningMessage';
import Results from "../components/major/Results";
import SideMenu from "../components/major/SideMenu";
import WaitersChart from "../components/major/WaitersChart";
import EnvelopeLanding from "../components/major/Envelope-Landing";
import Fete from "../components/major/Fete";
import WaitersMoney from "../components/major/WaitersMoney";
import Header from "../components/major/Header";

import {useSelector} from 'react-redux';
import Loader from "../components/UI/Loader/Loader";

function Home() {

    const {isLoaded: isWaitersLoaded} = useSelector(store => store.waiters);
    const [warning, setWarning] = React.useState(false);

    function showWarning() {
        setWarning(true);
        setTimeout(() => {
            setWarning(false)
        }, 2000);
    }

    return !isWaitersLoaded ? <Loader/> : (
        <div className="home">
            <SideMenu/>
            <div className="main">
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

export default Home;

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
import {storage} from "../utils";

import {useDispatch, useSelector} from 'react-redux';
import {fetchWaiters} from "../redux/slices/waiters";

function Home() {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchWaiters());
    }, []);

    const {waiters} = useSelector(store => store.waiters);
    const {mainFields} = useSelector(store => store.mainFields);
    const {fete} = useSelector(store => store.fete);
    const {isLoaded: isWaitersLoaded} = useSelector(store => store.waiters);
    const {isWarningShown} = useSelector(store => store.warning);
    const {darkMode} = useSelector(store => store.darkMode);

    const [isManagerRich, setIsManagerRich] = React.useState(storage('isManagerRich') || false);

    function handleIsManagerRichChange() {
        setIsManagerRich(prev => !prev);
    }

    //Сохранение данных
    const dataToStore = {
        'fete': fete,
        'mainFields': mainFields,
        'waiters': waiters,
        'isManagerRich': isManagerRich,
        'darkMode': darkMode
    }

    // React.useEffect(() => {
    //     for (let [name, obj] of Object.entries(dataToStore)) {
    //         localStorage.setItem(`${name}`, JSON.stringify(obj));
    //     }
    // }, Object.values(dataToStore));

    return !isWaitersLoaded ? <Loading/> : (
        <div className="home">
            <SideMenu waiters={waiters}/>
            <div className="main">
                <Header
                    waiters={waiters}
                    fete={fete}
                    mainFields={mainFields}
                />
                <WaitersChart waiters={waiters}/>
                <EnvelopeLanding
                    isManagerRich={isManagerRich}
                    mainFields={mainFields}
                    handleIsManagerRichChange={handleIsManagerRichChange}
                />
                <Fete
                    fete={fete}
                    setFeteData={() => console.log('hi')}
                />
                <Results
                    fete={fete}
                    mainFields={mainFields}
                    isManagerRich={isManagerRich}
                />
                <WaitersMoney
                    waiters={waiters}
                    mainFields={mainFields}
                />
            </div>
            <WarningMessage isShown={isWarningShown}>Нет данных</WarningMessage>
        </div>
    )
}

export default Home;
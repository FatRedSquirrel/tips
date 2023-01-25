import React from 'react';
import WaiterSideMenu from "../minor/WaiterSideMenu";

const SideMenu = ({waiters}) => {

    const [sideMenuOpen, setSideMenuOpen] = React.useState(false);

    const waiterSideMenuElements = waiters.map((waiter) =>
        <WaiterSideMenu
            key={waiter.id}
            id={waiter.id}
            name={waiter.name}
            isChosen={waiter.isChosen}
        />
    )

    function toggleSideMenu() {
        setSideMenuOpen(prev => !prev);
        document.body.classList.toggle("lock-scroll");
        document.documentElement.classList.toggle("lock-scroll");
    }

    return (
        <>
            <div className={sideMenuOpen ? "overlay" : "overlay hidden"} onClick={toggleSideMenu}></div>
            <button className={sideMenuOpen ? "burger hidden" : "burger"} onClick={toggleSideMenu}></button>
            <div className={sideMenuOpen ? "side-menu open" : "side-menu"}>
                {waiterSideMenuElements}
            </div>
        </>
    );
};

export default SideMenu;
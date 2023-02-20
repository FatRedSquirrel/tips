import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import WaiterSideMenu from "components/minor/waiter/WaiterSideMenu";
import classNames from "helpers/classNames";

import style from './index.module.scss';

const SideMenu = () => {

    const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
    const {waiters} = useSelector(store => store.waiters);

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
            <button
                className={sideMenuOpen ? classNames(style.burger, style.burger__hidden) : style.burger}
                onClick={toggleSideMenu}
            ></button>
            <div className={sideMenuOpen ? classNames(style.sideMenu, style.sideMenu__open) : style.sideMenu}>
                {waiterSideMenuElements}
                <Link
                    to='/login'
                    className={style.changeWaiters}
                    onClick={toggleSideMenu}
                >
                    Редактировать
                </Link>
            </div>
        </>
    );
};

export default SideMenu;

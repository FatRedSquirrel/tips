import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "router/routerConfig";

const Index = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map((route, index) => (
                <Route key={index} path={route.path} element={route.element}/>
            ))}
        </Routes>
    );
};

export default Index;

import MainPage from "pages/MainPage";
import EmployeesPage from "pages/EmployeesPage";
import LoginPage from "pages/LoginPage";

const AppRoutes = {
    MAIN: 'main',
    EMPLOYEES: 'employees',
    LOGIN: 'login',
    OTHER: 'other'
}

const RoutePaths = {
    [AppRoutes.MAIN]: '/tips',
    [AppRoutes.EMPLOYEES]: '/waiters',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.OTHER]: '*',
}

export const routeConfig = {
    [AppRoutes.MAIN]: {
        path: RoutePaths.main,
        element: <MainPage/>
    },
    [AppRoutes.EMPLOYEES]: {
        path: RoutePaths.employees,
        element: <EmployeesPage/>
    },
    [AppRoutes.LOGIN]: {
        path: RoutePaths.login,
        element: <LoginPage/>
    },
    [AppRoutes.OTHER]: {
        path: RoutePaths.other,
        element: <MainPage/>
    },
}
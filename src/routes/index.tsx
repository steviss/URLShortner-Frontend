import { DashboardPage, IndexPage, LoginPage, RegisterPage, PrivacyPage, TermsPage, ForgotPasswordPage, ChangePasswordPage } from '@pages';
import React, { ReactElement } from 'react';
import { Route } from 'react-router';
import { Redirect, Switch } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import GavelIcon from '@material-ui/icons/Gavel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

export interface RouteType {
    id: string;
    path: string;
    title: string;
    component?: ReactElement;
    icon?: ReactElement;
    params?: boolean;
}

export const userMenuRoutesArray: RouteType[] = [
    {
        id: 'dashboard',
        path: '/dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        component: <DashboardPage />,
    },
];
export const userFooterRoutesArray: RouteType[] = [
    {
        id: 'logout',
        path: '/logout',
        icon: <ExitToAppIcon />,
        title: 'Logout',
    },
];

export const publicMenuRoutesArray: RouteType[] = [
    {
        id: 'Home',
        path: '/',
        title: 'Home',
        icon: <HomeIcon />,
        component: <IndexPage />,
    },
    {
        id: 'terms',
        path: '/terms',
        title: 'Terms',
        icon: <GavelIcon />,
        component: <TermsPage />,
    },
    {
        id: 'privacy',
        path: '/privacy',
        title: 'Privacy',
        icon: <VpnKeyIcon />,
        component: <PrivacyPage />,
    },
];

export const publicFooterRoutesArray: RouteType[] = [
    {
        id: 'login',
        path: '/login',
        icon: <LockOpenIcon />,
        title: 'Login',
        component: <LoginPage />,
    },
    {
        id: 'register',
        path: '/register',
        title: 'Register',
        icon: <PersonAddIcon />,
        component: <RegisterPage />,
    },
];

export const publicUtilityRoutesArray: RouteType[] = [
    {
        id: 'forgot-password',
        path: '/forgot-password',
        title: 'Forgot Password',
        icon: <LockOpenIcon />,
        component: <ForgotPasswordPage />,
    },
    {
        id: 'change-password',
        path: '/change-password/:token',
        title: 'Change Password',
        params: true,
        icon: <RotateLeftIcon />,
        component: <ChangePasswordPage />,
    },
];

export const routesArray: RouteType[] = [...publicMenuRoutesArray, ...publicFooterRoutesArray, ...userMenuRoutesArray, ...userFooterRoutesArray, ...publicUtilityRoutesArray];

export default function Routes() {
    const realRoutes = routesArray.filter((route) => typeof route.component !== 'undefined');
    return (
        <Switch>
            <Redirect from="/change-password/" exact to="/" />
            {realRoutes.map((route) => {
                return route.params ? (
                    <Route key={route.id} path={route.path}>
                        {route.component}
                    </Route>
                ) : (
                    <Route key={route.id} exact path={route.path}>
                        {route.component}
                    </Route>
                );
            })}
        </Switch>
    );
}

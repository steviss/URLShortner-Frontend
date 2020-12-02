import { DashboardPage, IndexPage, LoginPage, RegisterPage, PrivacyPage, TermsPage } from '@pages';
import React, { ReactElement } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import GavelIcon from '@material-ui/icons/Gavel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export interface RouteType {
    path: string;
    title: string;
    component?: ReactElement;
    icon?: ReactElement;
}

export const userMenuRoutesArray: RouteType[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        component: <DashboardPage />,
    },
];
export const userFooterRoutesArray: RouteType[] = [
    {
        path: '/logout',
        icon: <ExitToAppIcon />,
        title: 'Logout',
    },
];

export const publicMenuRoutesArray: RouteType[] = [
    {
        path: '/',
        title: 'Home',
        icon: <HomeIcon />,
        component: <IndexPage />,
    },
    {
        path: '/terms',
        title: 'Terms',
        icon: <GavelIcon />,
        component: <TermsPage />,
    },
    {
        path: '/privacy',
        title: 'Privacy',
        icon: <VpnKeyIcon />,
        component: <PrivacyPage />,
    },
];

export const publicFooterRoutesArray: RouteType[] = [
    {
        path: '/login',
        icon: <LockOpenIcon />,
        title: 'Login',
        component: <LoginPage />,
    },
    {
        path: '/register',
        title: 'Register',
        icon: <PersonAddIcon />,
        component: <RegisterPage />,
    },
];

export const routesArray: RouteType[] = [...publicMenuRoutesArray, ...publicFooterRoutesArray, ...userMenuRoutesArray, ...userFooterRoutesArray];

export default function Routes() {
    return (
        <Switch>
            {routesArray.map((route, i) => {
                if (!route.component) return <></>;
                return (
                    <Route key={`route-${i}`} exact path={route.path}>
                        {route.component}
                    </Route>
                );
            })}
        </Switch>
    );
}

import { DashboardPage, IndexPage, LoginPage, RegisterPage, PrivacyPage, TermsPage, ForgotPasswordPage, ChangePasswordPage } from '@pages';
import React, { ReactElement } from 'react';
import { Route } from 'react-router';
import { Redirect, Switch } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import GavelIcon from '@material-ui/icons/Gavel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import { UserPermissions } from '../types/User';

export interface RouteType {
    id: string;
    path: string;
    title: string;
    component?: ReactElement;
    icon?: ReactElement;
    params?: boolean;
    permissions: UserPermissions;
    disallow?: boolean;
}

export const userMenuRoutesArray: RouteType[] = [
    {
        id: 'dashboard',
        path: '/dashboard',
        title: 'Dashboard',
        permissions: UserPermissions.User,
        icon: <DashboardIcon />,
        component: <DashboardPage />,
    },
];
export const userFooterRoutesArray: RouteType[] = [];

export const publicMenuRoutesArray: RouteType[] = [
    {
        id: 'Home',
        path: '/',
        title: 'Home',
        permissions: UserPermissions.Guest,
        icon: <HomeIcon />,
        component: <IndexPage />,
    },
    {
        id: 'terms',
        path: '/terms',
        title: 'Terms',
        permissions: UserPermissions.Guest,
        icon: <GavelIcon />,
        component: <TermsPage />,
    },
    {
        id: 'privacy',
        path: '/privacy',
        title: 'Privacy',
        permissions: UserPermissions.Guest,
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
        permissions: UserPermissions.Guest,
        disallow: true,
        component: <LoginPage />,
    },
    {
        id: 'register',
        path: '/register',
        title: 'Register',
        permissions: UserPermissions.Guest,
        disallow: true,
        icon: <PersonAddIcon />,
        component: <RegisterPage />,
    },
];

export const publicUtilityRoutesArray: RouteType[] = [
    {
        id: 'forgot-password',
        path: '/forgot-password',
        title: 'Forgot Password',
        permissions: UserPermissions.Guest,
        icon: <LockOpenIcon />,
        component: <ForgotPasswordPage />,
    },
    {
        id: 'change-password',
        path: '/change-password/:token',
        title: 'Change Password',
        permissions: UserPermissions.Guest,
        params: true,
        icon: <RotateLeftIcon />,
        component: <ChangePasswordPage />,
    },
];

export const routesArray: RouteType[] = [...publicMenuRoutesArray, ...publicFooterRoutesArray, ...userMenuRoutesArray, ...userFooterRoutesArray, ...publicUtilityRoutesArray];

export const Routes: React.FC = observer(() => {
    const realRoutes = routesArray.filter((route) => typeof route.component !== 'undefined');
    const {
        userStore: { userPermissions },
    } = useStore();
    const requiredPermissions = (permissions: number, disallowOtherGroups: boolean = false) => {
        if (disallowOtherGroups) {
            return userPermissions === permissions;
        } else {
            return userPermissions >= permissions;
        }
    };
    return (
        <Switch>
            <Redirect from="/change-password/" exact to="/" />
            {realRoutes.map((route) => {
                return route.params ? (
                    <Route key={route.id} path={route.path}>
                        {requiredPermissions(route.permissions, route?.disallow) ? route.component : <Redirect to="/" />}
                    </Route>
                ) : (
                    <Route key={route.id} exact path={route.path}>
                        {requiredPermissions(route.permissions, route?.disallow) ? route.component : <Redirect to="/" />}
                    </Route>
                );
            })}
        </Switch>
    );
});

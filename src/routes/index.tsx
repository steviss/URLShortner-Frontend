import { DashboardPage, IndexPage, LoginPage, RegisterPage } from '@pages';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const routesArray = [
    {
        path: '/',
        component: <IndexPage />,
    },
    {
        path: '/login',
        component: <LoginPage />,
    },
    {
        path: '/register',
        component: <RegisterPage />,
    },
    {
        path: 'dashboard',
        component: <DashboardPage />,
    },
];

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {routesArray.map((route, i) => {
                    return (
                        <Route key={`route-${i}`} exact path={route.path}>
                            {route.component}
                        </Route>
                    );
                })}
            </Switch>
        </BrowserRouter>
    );
}

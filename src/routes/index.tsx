import { IndexPage } from '@pages';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const routesArray = [
    {
        path: '/',
        component: <IndexPage />,
    },
];

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {routesArray.map((route) => {
                    return (
                        <Route exact path={route.path}>
                            {route.component}
                        </Route>
                    );
                })}
            </Switch>
        </BrowserRouter>
    );
}

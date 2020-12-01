import { IndexPage } from '@pages';
import { StoreProvider } from '@stores';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
    var isIE11 = !!window.MSInputMethodContext;
    if (isIE11) alert('(This site is not optimized for IE. Please use Chrome or Firefox or Edge)');
    return (
        <StoreProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                </Switch>
            </BrowserRouter>
        </StoreProvider>
    );
};

export default App;

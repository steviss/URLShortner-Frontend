import React, { useEffect } from 'react';
import Routes from '@routes';
import { wrapperStyle } from '@styles';
import './App.css';
import { TopHeader } from '@headers/TopHeader';
import { UserDrawer, MenuDrawer } from '@drawers';
import { useStore } from '@stores';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

const App: React.FC = observer(() => {
    var isIE11 = !!window.MSInputMethodContext;
    if (isIE11) alert('(This site is not optimized for IE. Please use Chrome or Firefox or Edge)');
    const wrapperCSS = wrapperStyle();
    const {
        userStore: { checkAuth },
        layoutStore: { pageWrapperClass },
    } = useStore();
    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <BrowserRouter>
            <main className={`${wrapperCSS.root} ${pageWrapperClass}`}>
                <TopHeader />
                <MenuDrawer />
                <Routes />
                <UserDrawer />
            </main>
        </BrowserRouter>
    );
});

export default App;

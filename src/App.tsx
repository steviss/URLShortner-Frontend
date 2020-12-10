import React, { useEffect, useState } from 'react';
import { Routes } from '@routes';
import { wrapperStyle, loadingPageStyle } from '@styles';
import './App.css';
import { TopHeader } from '@headers/TopHeader';
import { UserDrawer, MenuDrawer } from '@drawers';
import { useStore } from '@stores';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { LoadingPage } from '@pages';

const App: React.FC = observer(() => {
    var isIE11 = !!window.MSInputMethodContext;
    if (isIE11) alert('(This site is not optimized for IE. Please use Chrome or Firefox or Edge)');
    const [loading, setLoading] = useState<boolean>(true);
    const wrapperCSS = wrapperStyle();
    const loadingPageCSS = loadingPageStyle();
    const {
        userStore: { checkAuth },
        layoutStore: { pageWrapperClass },
    } = useStore();
    useEffect(() => {
        setLoading(true);
        checkAuth().then(() => setLoading(false));
        return () => {
            setLoading(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (loading)
        return (
            <main className={`${wrapperCSS.root} ${loadingPageCSS.root}`}>
                <LoadingPage />
            </main>
        );
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

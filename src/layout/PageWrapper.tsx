import React, { useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { wrapperStyle } from '@styles';
import { useStore } from '@stores';
import { observer } from 'mobx-react';
import { CookieConsent } from './CookieConsent';

interface PageWrapperProps {
    pageClass?: string;
    defaultWrap?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = observer(({ children, pageClass = '', defaultWrap = true }) => {
    const wrapperCSS = wrapperStyle();
    const {
        layoutStore: { setPageWrapperClass, clearPageWrapperClass },
    } = useStore();
    useEffect(() => {
        if (!!pageClass) {
            setPageWrapperClass(pageClass);
        } else {
            clearPageWrapperClass();
        }
        return () => {
            clearPageWrapperClass();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageClass]);
    return (
        <>
            {defaultWrap ? (
                <Container maxWidth="lg" className={wrapperCSS.container}>
                    <Paper>{children}</Paper>
                    <CookieConsent />
                </Container>
            ) : (
                <>
                    {children}
                    <CookieConsent />
                </>
            )}
        </>
    );
});

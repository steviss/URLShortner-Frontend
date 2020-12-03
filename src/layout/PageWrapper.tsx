import React, { useEffect, useState } from 'react';
import { Box, Container, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import { wrapperStyle, cookieConsentStyle } from '@styles';
import { useStore } from '@stores';
import { observer } from 'mobx-react';
import CloseIcon from '@material-ui/icons/Close';

interface PageWrapperProps {
    pageClass?: string;
    defaultWrap?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = observer(({ children, pageClass = '', defaultWrap = true }) => {
    const [consent, setConsent] = useState<boolean>(false);
    const wrapperCSS = wrapperStyle();
    const cookieConsentCSS = cookieConsentStyle();
    const {
        layoutStore: { setPageWrapperClass, clearPageWrapperClass },
    } = useStore();
    useEffect(() => {
        if (!!pageClass) {
            setPageWrapperClass(pageClass);
        } else {
            clearPageWrapperClass();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageClass]);
    return (
        <>
            {defaultWrap ? (
                <Container maxWidth="lg" className={wrapperCSS.container}>
                    <Paper>{children}</Paper>
                    <Snackbar open={!consent} onClose={() => setConsent(true)}>
                        <Paper className={cookieConsentCSS.paper} elevation={5}>
                            <Box className={cookieConsentCSS.container}>
                                <IconButton className={cookieConsentCSS.buttonClose} size="small" onClick={() => setConsent(true)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="h4" className={cookieConsentCSS.headline}>
                                    This website uses cookies
                                </Typography>
                                <Typography variant="body1" className={cookieConsentCSS.message}>
                                    We inform you that this site uses own, technical and third parties cookies to make sure our web page is user-friendly and to guarantee a high functionality of the
                                    webpage. By continuing to browse this website, you declare to accept the use of cookies.
                                </Typography>
                            </Box>
                        </Paper>
                    </Snackbar>
                </Container>
            ) : (
                <>{children}</>
            )}
        </>
    );
});

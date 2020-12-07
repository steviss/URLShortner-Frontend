import { Snackbar, Paper, Box, IconButton, Typography } from '@material-ui/core';
import { useStore } from '@stores';
import { cookieConsentStyle } from '@styles';
import { observer } from 'mobx-react';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

export const CookieConsent: React.FC = observer(() => {
    const cookieConsentCSS = cookieConsentStyle();
    const {
        userStore: { cookieConsent, setCookieConsent },
    } = useStore();
    return (
        <Snackbar open={!cookieConsent} onClose={() => setCookieConsent(true)}>
            <Paper className={cookieConsentCSS.paper} elevation={5}>
                <Box className={cookieConsentCSS.container}>
                    <IconButton className={cookieConsentCSS.buttonClose} size="small" onClick={() => setCookieConsent(true)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="h4" className={cookieConsentCSS.headline}>
                        This website uses cookies
                    </Typography>
                    <Typography variant="body1" className={cookieConsentCSS.message}>
                        We inform you that this site uses own, technical and third parties cookies to make sure our web page is user-friendly and to guarantee a high functionality of the webpage. By
                        continuing to browse this website, you declare to accept the use of cookies.
                    </Typography>
                </Box>
            </Paper>
        </Snackbar>
    );
});

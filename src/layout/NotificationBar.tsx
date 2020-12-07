import React from 'react';
import { observer } from 'mobx-react';
import { Box, IconButton, Snackbar, Typography } from '@material-ui/core';
import { useStore } from '@stores';
import { notificationStyle } from '@styles';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

export const NotificationBar: React.FC = observer(() => {
    const {
        notificationStore: { open, duration, closeNotification, type, message },
    } = useStore();
    const notificationCSS = notificationStyle();
    const close = (_: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        closeNotification();
    };
    const renderIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className={notificationCSS.successIcon} />;
            case 'warning':
                return <WarningIcon className={notificationCSS.warningIcon} />;
            case 'error':
                return <ErrorIcon className={notificationCSS.errorIcon} />;
            case 'info':
                return <InfoIcon className={notificationCSS.infoIcon} />;
            default:
                return <InfoIcon className={notificationCSS.infoIcon} />;
        }
    };
    const notifcationBody = () => {
        return (
            <Box className={notificationCSS.root}>
                <Box className={notificationCSS.icon}>{renderIcon()}</Box>
                <Typography variant="body1" component="span" className={notificationCSS.message}>
                    {message}
                </Typography>
                <IconButton className={notificationCSS.buttonClose} size="small" onClick={() => closeNotification()}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
        );
    };
    return <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={duration} open={open} onClose={close} message={notifcationBody()} />;
});

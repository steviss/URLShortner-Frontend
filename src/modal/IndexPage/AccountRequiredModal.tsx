import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button, Box } from '@material-ui/core';
import { dialogStyle, accountRequiredModalStyle } from '@styles';
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { CustomButton } from '@objects';
import { observer } from 'mobx-react';

export interface ModalProps {
    open: boolean;
    handleClose: () => void;
}

export const AccountRequiredModal: React.FC<ModalProps> = observer(({ open, handleClose }) => {
    const dialogCSS = dialogStyle();
    const history = useHistory();
    const accountRequiredModalCSS = accountRequiredModalStyle();
    let modalId = 'Account Required Modal';
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={modalId} classes={dialogCSS}>
            <DialogTitle className={accountRequiredModalCSS.dialogHeader}>
                <Typography variant="h2" component="span" className={accountRequiredModalCSS.heading}>
                    Account Required
                </Typography>
                <IconButton className={accountRequiredModalCSS.dialogHeaderClose} size="small" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent className={accountRequiredModalCSS.dialogContent}>
                <Typography variant="body1" component="p" className={accountRequiredModalCSS.bodyText}>
                    In order to claim ownership of a Redirect, you are required to register an account with us. However, if you are already a user, just login in to claim ownership.
                </Typography>
                <Box className={accountRequiredModalCSS.buttonBox}>
                    <CustomButton
                        label="Login"
                        onClick={() => {
                            history.push('/login');
                        }}
                        endIcon={<LockOpenIcon />}
                    />
                    <CustomButton
                        label="Register"
                        onClick={() => {
                            history.push('/register');
                        }}
                        endIcon={<PersonAddIcon />}
                    />
                </Box>
            </DialogContent>
            <DialogActions className={accountRequiredModalCSS.dialogFooter}>
                <Button onClick={handleClose} className={accountRequiredModalCSS.dialogClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
});

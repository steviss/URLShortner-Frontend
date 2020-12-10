import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { dialogStyle, claimRedirectModalStyle } from '@styles';
import { SubmitButton } from '@objects';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { ClaimType } from 'stores/ClaimStore';
import HttpIcon from '@material-ui/icons/Http';
import DnsIcon from '@material-ui/icons/Dns';
import { Formik, Form } from 'formik';
import { useStore } from '@stores';
import { observer } from 'mobx-react';
import * as Yup from 'yup';

export interface ModalProps {
    open: boolean;
    handleClose: () => void;
    redirect: ClaimType | null;
}
const validationSchema = Yup.object({
    id: Yup.string().min(36),
    claimKey: Yup.string().min(12),
});

export const ClaimRedirectModal: React.FC<ModalProps> = observer(({ open, handleClose, redirect }) => {
    const dialogCSS = dialogStyle();
    const claimRedirectModalCSS = claimRedirectModalStyle();
    let modalId = 'Claim Redirect Modal';
    const { id, slug, url, claimKey } = redirect || { id: '', slug: '', url: '', claimKey: '' };
    const {
        claimStore: { claimRedirect },
    } = useStore();
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={modalId} classes={dialogCSS}>
            <Formik
                initialValues={{ id: id, claimKey: claimKey }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await claimRedirect(values);
                    setSubmitting(false);
                    handleClose();
                }}
                validationSchema={validationSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <DialogTitle className={claimRedirectModalCSS.dialogHeader}>
                            <Typography variant="h2" component="span" className={claimRedirectModalCSS.heading}>
                                Claim Redirect
                            </Typography>
                            <IconButton className={claimRedirectModalCSS.dialogHeaderClose} size="small" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent className={claimRedirectModalCSS.dialogContent}>
                            <Box className={claimRedirectModalCSS.body}>
                                <Typography variant="body1" component="p" className={claimRedirectModalCSS.bodyText}>
                                    Do you want to claim the following redirect:
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DnsIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Slug" secondary={slug || 'none'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <HttpIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="URL" secondary={url || 'none'} />
                                    </ListItem>
                                </List>
                            </Box>
                            <Box className={claimRedirectModalCSS.buttonBox}></Box>
                        </DialogContent>
                        <DialogActions className={claimRedirectModalCSS.dialogFooter}>
                            <Button onClick={handleClose} className={claimRedirectModalCSS.dialogClose}>
                                Close
                            </Button>
                            <SubmitButton customClass={claimRedirectModalCSS.dialogSave} type="submit" isSubmitting={isSubmitting} endIcon={<LoyaltyIcon />} label="Claim" />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
});

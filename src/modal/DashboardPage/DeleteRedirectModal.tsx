import React from 'react';
import { Form, Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { dialogStyle, deleteRedirectModalStyle } from '@styles';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { observer } from 'mobx-react';
import DeleteIcon from '@material-ui/icons/Delete';
import { SubmitButton } from '@objects';
import MouseIcon from '@material-ui/icons/Mouse';
import HttpIcon from '@material-ui/icons/Http';
import DnsIcon from '@material-ui/icons/Dns';

export interface FormModalProps {
    open: boolean;
    handleClose: () => void;
    redirect: DeleteModalInitType | null;
}
const validationSchema = Yup.object({
    id: Yup.string().min(36),
});
export interface DeleteModalInitType {
    id: string;
    name: string;
    url: string;
    clicks: number;
}
export const DeleteRedirectModal: React.FC<FormModalProps> = observer(({ open, handleClose, redirect }) => {
    const dialogCSS = dialogStyle();
    const deleteRedirectModalCSS = deleteRedirectModalStyle();
    const { id: redirectId, name, url, clicks } = redirect || { id: '', name: '', url: '', clicks: 0 };
    let id = 'DeleteRedirectModal';
    const {
        redirectStore: { deleteRedirect },
    } = useStore();
    return (
        <Dialog disableEnforceFocus open={open} onClose={handleClose} aria-labelledby={id} classes={dialogCSS}>
            <Formik
                initialValues={{ id: redirectId }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await deleteRedirect(values.id);
                    setSubmitting(false);
                    handleClose();
                }}
                validationSchema={validationSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <DialogTitle id={id} className={deleteRedirectModalCSS.dialogHeader}>
                            <Typography variant="h2" component="span" className={deleteRedirectModalCSS.heading}>
                                Delete Redirect
                            </Typography>
                            <IconButton className={deleteRedirectModalCSS.dialogHeaderClose} size="small" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DnsIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Slug" secondary={name || 'none'} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <HttpIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="URL" secondary={url || 'none'} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MouseIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Clicks" secondary={clicks || '0'} />
                                </ListItem>
                            </List>
                        </DialogContent>
                        <DialogActions className={deleteRedirectModalCSS.dialogFooter}>
                            <Button onClick={handleClose} className={deleteRedirectModalCSS.dialogCancel}>
                                Cancel
                            </Button>
                            <SubmitButton customClass={deleteRedirectModalCSS.dialogSave} type="submit" isSubmitting={isSubmitting} onClick={submitForm} endIcon={<DeleteIcon />} label="Delete" />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
});

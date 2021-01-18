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
    collection: DeleteCollectionModalInitType | null;
}
const validationSchema = Yup.object({
    id: Yup.string().uuid(),
});
export interface DeleteCollectionModalInitType {
    id: string;
    name: string;
    clicks: number;
    lastClickedAt: string;
}
export const DeleteCollectionModal: React.FC<FormModalProps> = observer(({ open, handleClose, collection }) => {
    const dialogCSS = dialogStyle();
    const deleteRedirectModalCSS = deleteRedirectModalStyle();
    const { id, name, lastClickedAt, clicks } = collection || { id: '', name: '', lastClickedAt: '', clicks: 0 };
    let modalId = 'Delete Redirect Modal';
    const {
        redirectStore: { deleteRedirect },
    } = useStore();
    return (
        <Dialog disableEnforceFocus open={open} onClose={handleClose} aria-labelledby={modalId} classes={dialogCSS}>
            <Formik
                initialValues={{ id: id }}
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
                        <DialogTitle className={deleteRedirectModalCSS.dialogHeader}>
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
                                    <ListItemText primary="Name" secondary={name || 'none'} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <HttpIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Last Clicked" secondary={lastClickedAt || 'none'} />
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
                            <SubmitButton customClass={deleteRedirectModalCSS.dialogSave} type="submit" isSubmitting={isSubmitting} endIcon={<DeleteIcon />} label="Delete" />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
});

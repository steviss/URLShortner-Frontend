import React, { ReactElement } from 'react';
import { Form, Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from '@material-ui/core';
import { dialogStyle } from '@styles';

export interface FormModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    text?: string;
    children: ReactElement;
    initialValues: { [key: string]: string };
    callback: (arg: { [key: string]: string }) => Promise<void>;
}

export const FormModal: React.FC<FormModalProps> = ({ open, handleClose, title, text, children, initialValues, callback }) => {
    const dialogCSS = dialogStyle();
    return (
        <Dialog disableEnforceFocus open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ ...dialogCSS }}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await callback(values);
                    setSubmitting(false);
                    handleClose();
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <DialogTitle id="form-dialog-title" className={dialogCSS.dialogHeader}>
                            <Typography>{title}</Typography>
                            <IconButton className={dialogCSS.dialogHeaderClose} size="small" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            {text && <DialogContentText>{text}</DialogContentText>}
                            {children}
                        </DialogContent>
                        <DialogActions className={dialogCSS.dialogFooter}>
                            <Button onClick={handleClose} className={dialogCSS.dialogCancel}>
                                Cancel
                            </Button>
                            <Button disabled={isSubmitting} onClick={submitForm} className={dialogCSS.dialogSave}>
                                Save {isSubmitting && <CircularProgress style={{ width: 20, height: 20, marginLeft: 5 }} />}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

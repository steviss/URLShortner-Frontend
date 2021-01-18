import React from 'react';
import { Form, Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button } from '@material-ui/core';
import { dialogStyle, addRedirectModalStyle } from '@styles';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { observer } from 'mobx-react';
import AddIcon from '@material-ui/icons/Add';
import { InputField, SubmitButton } from '@objects';

export interface FormModalProps {
    open: boolean;
    handleClose: () => void;
}
const validationSchema = Yup.object({
    slug: Yup.string()
        .trim()
        .min(3)
        .max(12)
        .matches(/^[\w-]+$/i),
    url: Yup.string().trim().url('Must be a valid URL').required('URL is required in order to shorten it.'),
});

export const AddRedirectModal: React.FC<FormModalProps> = observer(({ open, handleClose }) => {
    const dialogCSS = dialogStyle();
    const addRedirectModalCSS = addRedirectModalStyle();
    let modalId = 'Add Redirect Modal';
    const {
        redirectStore: { createRedirect },
    } = useStore();
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={modalId} classes={dialogCSS}>
            <Formik
                initialValues={{ url: '', slug: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await createRedirect(values);
                    setSubmitting(false);
                    handleClose();
                }}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <DialogTitle className={addRedirectModalCSS.dialogHeader}>
                            <Typography variant="h2" component="span" className={addRedirectModalCSS.heading}>
                                Create Redirect
                            </Typography>
                            <IconButton className={addRedirectModalCSS.dialogHeaderClose} size="small" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <InputField customContainerClass={addRedirectModalCSS.textFields} id="url" label="URL" variant="outlined" placeholder="Enter URL" />
                            <InputField customContainerClass={addRedirectModalCSS.textFields} id="slug" label="Slug" variant="outlined" placeholder="Enter Slug" />
                        </DialogContent>
                        <DialogActions className={addRedirectModalCSS.dialogFooter}>
                            <Button onClick={handleClose} className={addRedirectModalCSS.dialogCancel}>
                                Cancel
                            </Button>
                            <SubmitButton customClass={addRedirectModalCSS.dialogSave} type="submit" isSubmitting={isSubmitting} endIcon={<AddIcon />} label="Add Redirect" />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
});

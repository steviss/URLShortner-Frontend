import React from 'react';
import { Form, Formik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, DialogActions, Button } from '@material-ui/core';
import { dialogStyle, addCollectionModalStyle } from '@styles';
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
    name: Yup.string()
        .trim()
        .min(3)
        .max(12)
        .matches(/^[\w-]+$/i),
});

export const AddCollectionModal: React.FC<FormModalProps> = observer(({ open, handleClose }) => {
    const dialogCSS = dialogStyle();
    const addCollectionModalCSS = addCollectionModalStyle();
    let modalId = 'Add Collection Modal';
    const {
        collectionStore: { createCollection },
    } = useStore();
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={modalId} classes={dialogCSS}>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await createCollection(values);
                    setSubmitting(false);
                    handleClose();
                }}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <DialogTitle className={addCollectionModalCSS.dialogHeader}>
                            <Typography variant="h2" component="span" className={addCollectionModalCSS.heading}>
                                Create Collection
                            </Typography>
                            <IconButton className={addCollectionModalCSS.dialogHeaderClose} size="small" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent className={addCollectionModalCSS.dialogBody}>
                            <InputField customContainerClass={addCollectionModalCSS.textFields} id="name" label="Name" variant="outlined" placeholder="Enter name" />
                        </DialogContent>
                        <DialogActions className={addCollectionModalCSS.dialogFooter}>
                            <Button onClick={handleClose} className={addCollectionModalCSS.dialogCancel}>
                                Cancel
                            </Button>
                            <SubmitButton customClass={addCollectionModalCSS.dialogSave} type="submit" isSubmitting={isSubmitting} endIcon={<AddIcon />} label="Add Collection" />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
});

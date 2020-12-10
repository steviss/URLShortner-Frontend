import React from 'react';
import { Divider, Paper, Typography, Slide } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { InputField } from '@objects';
import { changePasswordFormStyle } from '@styles';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { ChangePasswordFormType } from '../types/User';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { SubmitButton } from '@objects';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    token: Yup.string().required('No token provided').min(36),
    password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
});

interface ChangePasswordFormProps {
    token: string;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = observer(({ token }) => {
    const changePasswordFormCSS = changePasswordFormStyle();
    const initialValues: ChangePasswordFormType = { token: token, password: '' };
    const {
        apiStore: { changePassword },
    } = useStore();
    const history = useHistory();
    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper square className={changePasswordFormCSS.formPaper}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await changePassword(values).then(() => {
                            setSubmitting(false);
                            history.push('/dashboard');
                        });
                    }}
                    validationSchema={validationSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={changePasswordFormCSS.form}>
                            <Typography variant="h2" align="center" className={changePasswordFormCSS.heading}>
                                Change Password
                            </Typography>
                            <InputField
                                customContainerClass={changePasswordFormCSS.textFields}
                                id="password"
                                type="password"
                                label="New Password"
                                variant="outlined"
                                placeholder="Enter New Password"
                            />
                            <SubmitButton customClass={changePasswordFormCSS.submitButton} type="submit" isSubmitting={isSubmitting} endIcon={<RotateLeftIcon />} label="Change Password" />
                        </Form>
                    )}
                </Formik>
                <Divider />
            </Paper>
        </Slide>
    );
});

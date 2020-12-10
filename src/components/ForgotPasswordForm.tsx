import React from 'react';
import { Divider, Paper, Typography, Slide } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { InputField } from '@objects';
import { forgotPasswordFormStyle } from '@styles';
import { ForgotPasswordFormType } from '../types/User';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { SubmitButton } from '@objects';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { observer } from 'mobx-react';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

export const ForgotPasswordForm: React.FC = observer(() => {
    const forgotPasswordFormCSS = forgotPasswordFormStyle();
    const initialValues: ForgotPasswordFormType = { email: '' };
    const {
        apiStore: { forgotPassword },
        notificationStore: { createNotification },
    } = useStore();
    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper square className={forgotPasswordFormCSS.formPaper}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        await forgotPassword(values).then((response) => {
                            createNotification('success', response.message || '');
                        });
                    }}
                    validationSchema={validationSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={forgotPasswordFormCSS.form}>
                            <Typography variant="h2" align="center" className={forgotPasswordFormCSS.heading}>
                                Forgot Password
                            </Typography>
                            <InputField customContainerClass={forgotPasswordFormCSS.textFields} id="email" label="E-mail" variant="outlined" placeholder="Enter E-mail" />
                            <SubmitButton customClass={forgotPasswordFormCSS.submitButton} type="submit" isSubmitting={isSubmitting} endIcon={<LockOpenIcon />} label="Reset Password" />
                        </Form>
                    )}
                </Formik>
                <Divider />
            </Paper>
        </Slide>
    );
});

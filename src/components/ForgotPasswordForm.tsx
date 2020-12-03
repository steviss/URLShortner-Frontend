import React from 'react';
import { Divider, Paper, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { InputField } from '@objects';
import { forgotPasswordFormStyle } from '@styles';
import { ForgotPasswordFormType } from '../types/User';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { sleep } from '@utility/sleep';
import { SubmitButton } from '@objects';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { observer } from 'mobx-react';
//import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

export const ForgotPasswordForm: React.FC = observer(() => {
    const forgotPasswordFormCSS = forgotPasswordFormStyle();
    const initialValues: ForgotPasswordFormType = { email: '' };
    const {
        apiStore: { forgotPassword },
    } = useStore();
    //const history = useHistory();
    return (
        <Paper square className={forgotPasswordFormCSS.formPaper}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await sleep(2000);
                    await forgotPassword(values);
                    //history.push('/dashboard');
                    setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={forgotPasswordFormCSS.form}>
                        <Typography variant="h2" align="center" className={forgotPasswordFormCSS.heading}>
                            Forgot Password
                        </Typography>
                        <InputField customContainerClass={forgotPasswordFormCSS.textFields} id="email" label="E-mail" variant="outlined" placeholder="Enter E-mail" />
                        <SubmitButton
                            customClass={forgotPasswordFormCSS.submitButton}
                            type="submit"
                            isSubmitting={isSubmitting}
                            onClick={submitForm}
                            endIcon={<LockOpenIcon />}
                            label="Reset Password"
                        />
                    </Form>
                )}
            </Formik>
            <Divider />
        </Paper>
    );
});

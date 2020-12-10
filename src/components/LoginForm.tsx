import React from 'react';
import { Box, Divider, Paper, Typography, Slide } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { InputField } from '@objects';
import { loginFormStyle } from '@styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { LoginFormType, UserType } from '../types/User';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { SubmitButton } from '@objects';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { toErrorMap } from '@utility/toErrorMap';

const validationSchema = Yup.object().shape({
    password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const LoginForm: React.FC = observer(() => {
    const loginFormCSS = loginFormStyle();
    const initialValues: LoginFormType = { email: '', password: '' };
    const {
        apiStore: { login },
        userStore: { setUser },
    } = useStore();
    const history = useHistory();
    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper square className={loginFormCSS.formPaper}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        setSubmitting(true);
                        await login(values).then((response) => {
                            if (response.errors) {
                                setErrors(toErrorMap(response.errors));
                            } else {
                                setUser(response.data as UserType);
                                history.push('/dashboard');
                            }
                        });
                    }}
                    validationSchema={validationSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={loginFormCSS.form}>
                            <Typography variant="h2" align="center" className={loginFormCSS.heading}>
                                Login
                            </Typography>
                            <InputField customContainerClass={loginFormCSS.textFields} id="email" label="E-mail" variant="outlined" placeholder="Enter E-mail" />
                            <Box className={loginFormCSS.forgotPassword}>
                                <Typography variant="caption" align="right">
                                    <Link key="forgot-password" to={'/forgot-password'} className={loginFormCSS.links}>
                                        Forgot Password
                                    </Link>
                                </Typography>
                            </Box>
                            <InputField customContainerClass={loginFormCSS.textFields} id="password" type="password" label="Password" variant="outlined" placeholder="Enter Password" />
                            <SubmitButton customClass={loginFormCSS.submitButton} type="submit" isSubmitting={isSubmitting} endIcon={<LockOpenIcon />} label="Login" />
                            <Box className={loginFormCSS.registerInfo}>
                                <Typography variant="caption" align="center">
                                    You do not have an account?
                                </Typography>
                                <Typography variant="caption" align="center">
                                    <Link key="register" to={'/register'} className={loginFormCSS.links}>
                                        Register an account
                                    </Link>
                                </Typography>
                            </Box>
                        </Form>
                    )}
                </Formik>
                <Divider />
            </Paper>
        </Slide>
    );
});

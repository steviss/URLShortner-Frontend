import React from 'react';
import { Box, Divider, Paper, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { InputField } from '@objects';
import { registerFormStyle } from '@styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { RegisterFormType } from '../types/User';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { sleep } from '@utility/sleep';
import { SubmitButton } from '@objects';
import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const RegisterForm: React.FC = () => {
    const registerFormCSS = registerFormStyle();
    const initialValues: RegisterFormType = { email: '', password: '' };
    const {
        apiStore: { register },
    } = useStore();
    //const history = useHistory();
    return (
        <Paper square className={registerFormCSS.formPaper}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await sleep(2000);
                    await register(values);
                    //history.push('/dashboard');
                    setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={registerFormCSS.form}>
                        <Typography variant="h2" align="center" className={registerFormCSS.heading}>
                            Register
                        </Typography>
                        <InputField customContainerClass={registerFormCSS.textFields} id="email" label="E-mail" variant="outlined" placeholder="Enter E-mail" />
                        <InputField customContainerClass={registerFormCSS.textFields} id="password" type="password" label="Password" variant="outlined" placeholder="Enter Password" />
                        <SubmitButton customClass={registerFormCSS.submitButton} type="submit" isSubmitting={isSubmitting} onClick={submitForm} endIcon={<PersonAddIcon />} label="Register" />
                        <Box className={registerFormCSS.registerInfo}>
                            <Typography variant="caption" align="center">
                                You already have an account?
                            </Typography>
                            <Typography variant="caption" align="center">
                                <Link key="login" to={'/login'} className={registerFormCSS.links}>
                                    Login
                                </Link>
                            </Typography>
                        </Box>
                    </Form>
                )}
            </Formik>
            <Divider />
        </Paper>
    );
};
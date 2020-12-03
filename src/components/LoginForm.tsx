import React from 'react';
import { Box, Button, Divider, Paper, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { ProgressIndicator } from '@objects';
import { buttonObjectStyle, loginFormStyle } from '@styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export const LoginForm: React.FC = () => {
    const buttonObjectCSS = buttonObjectStyle();
    const loginFormCSS = loginFormStyle();
    return (
        <Paper square className={loginFormCSS.formPaper}>
            <Formik
                initialValues={{}}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    //await callback(values);
                    setSubmitting(false);
                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={loginFormCSS.form}>
                        <TextField id="email" label="Enter Username" variant="outlined" />
                        <TextField id="password" label="Enter Password" variant="outlined" />
                        {isSubmitting ? (
                            <Box>
                                <ProgressIndicator />
                            </Box>
                        ) : null}
                        <Button type="submit" className={`${buttonObjectCSS.root}`} onClick={submitForm} endIcon={<LockOpenIcon />}>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
            <Divider />
        </Paper>
    );
};

import React from 'react';
import { Box, Button, Divider, Paper } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { InputField, ProgressIndicator } from '@objects';
import { buttonObjectStyle, shortenFormStyle } from '@styles';
import ShortTextIcon from '@material-ui/icons/ShortText';
import * as Yup from 'yup';
import { useStore } from '@stores';
import { sleep } from '@utility/sleep';
import { RegisterFormType } from '../types/User';

const validationSchema = Yup.object().shape({
    password: Yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const RegisterForm: React.FC = () => {
    const buttonObjectCSS = buttonObjectStyle();
    const shortenFormCSS = shortenFormStyle();
    const initialValues: RegisterFormType = { password: '', email: '' };
    const {
        apiStore: { register },
    } = useStore();
    return (
        <Paper square className={shortenFormCSS.formPaper}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await sleep(3000);
                    await register(values);
                    setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={shortenFormCSS.form}>
                        <div className={shortenFormCSS.textFieldContainer}>
                            <InputField id="url" label="Enter URL" variant="outlined" className={shortenFormCSS.textField} placeholder="Enter your url here..." />
                            {isSubmitting ? (
                                <Box className={shortenFormCSS.progressLoader}>
                                    <ProgressIndicator />
                                </Box>
                            ) : null}
                        </div>
                        <Button disabled={isSubmitting} className={`${shortenFormCSS.button} ${buttonObjectCSS.root}`} onClick={submitForm} endIcon={<ShortTextIcon />}>
                            Shorten
                        </Button>
                    </Form>
                )}
            </Formik>
            <Divider />
        </Paper>
    );
};

import React from 'react';
import { observer } from 'mobx-react';
import { PageWrapper } from '@layout';
import { loginPageStyle } from '@styles';
import { ForgotPasswordForm } from '@components';
import { Container, Grid } from '@material-ui/core';

export const ForgotPasswordPage: React.FC = observer(() => {
    const loginPageCSS = loginPageStyle();
    return (
        <PageWrapper pageClass={loginPageCSS.root} defaultWrap={false}>
            <Container maxWidth="lg" className={loginPageCSS.container}>
                <Grid className={loginPageCSS.grid}>
                    <ForgotPasswordForm></ForgotPasswordForm>
                </Grid>
            </Container>
        </PageWrapper>
    );
});

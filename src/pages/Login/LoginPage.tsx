import React from 'react';
import { observer } from 'mobx-react';
import { PageWrapper } from '@layout';
import { loginPageStyle } from '@styles';
import { LoginForm } from '@components';
import { Container, Grid } from '@material-ui/core';

export const LoginPage: React.FC = observer(() => {
    const loginPageCSS = loginPageStyle();
    return (
        <PageWrapper pageClass={loginPageCSS.root} defaultWrap={false}>
            <Container maxWidth="lg" className={loginPageCSS.container}>
                <Grid className={loginPageCSS.grid}>
                    <LoginForm></LoginForm>
                </Grid>
            </Container>
        </PageWrapper>
    );
});

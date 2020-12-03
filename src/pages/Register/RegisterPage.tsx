import React from 'react';
import { observer } from 'mobx-react';
import { PageWrapper } from '@layout';
import { registerPageStyle } from '@styles';
import { RegisterForm } from '@components';
import { Container, Grid } from '@material-ui/core';

export const RegisterPage: React.FC = observer(() => {
    const registerPageCSS = registerPageStyle();
    return (
        <PageWrapper pageClass={registerPageCSS.root} defaultWrap={false}>
            <Container maxWidth="lg" className={registerPageCSS.container}>
                <Grid className={registerPageCSS.grid}>
                    <RegisterForm></RegisterForm>
                </Grid>
            </Container>
        </PageWrapper>
    );
});

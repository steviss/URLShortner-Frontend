import React, { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { PageHeader, PageWrapper } from '@layout';
import { dashboardPageStyle } from '@styles';
import { RedirectTable, ClickRedirectLinks, TotalClicksPie } from '@components';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import AddIcon from '@material-ui/icons/Add';

export const DashboardPage: React.FC = observer(() => {
    const dashboardPageCSS = dashboardPageStyle();
    const {
        redirectStore: { getRedirects },
        userStore: { user },
    } = useStore();
    useEffect(() => {
        getRedirects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <PageHeader className={dashboardPageCSS.header}>
                <Container maxWidth={false} className={dashboardPageCSS.container}>
                    <Grid container justifyContent="space-between" alignItems="center" className={dashboardPageCSS.headerGrid}>
                        <Typography variant="h1" className={dashboardPageCSS.welcomeMessage}>
                            Welcome, {user.email}
                        </Typography>
                        <Button className={dashboardPageCSS.addButton} startIcon={<AddIcon />}>
                            Create Redirect
                        </Button>
                    </Grid>
                </Container>
            </PageHeader>
            <PageWrapper pageClass={dashboardPageCSS.root} defaultWrap={false}>
                <Container maxWidth={false} className={dashboardPageCSS.container}>
                    <Grid container className={dashboardPageCSS.grid}>
                        <ClickRedirectLinks />
                        <TotalClicksPie />
                        <RedirectTable />
                    </Grid>
                </Container>
            </PageWrapper>
        </>
    );
});

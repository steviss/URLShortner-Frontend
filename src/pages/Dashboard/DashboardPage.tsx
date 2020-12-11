import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { PageHeader, PageWrapper } from '@layout';
import { dashboardPageStyle } from '@styles';
import { ClickRedirectLinks, TotalClicksPie, EnhancedTable } from '@components';
import { observer } from 'mobx-react';
import { useStore } from '@stores';
import AddIcon from '@material-ui/icons/Add';
import { AddRedirectModal } from '@modal';

export const DashboardPage: React.FC = observer(() => {
    const dashboardPageCSS = dashboardPageStyle();
    const [open, setOpen] = useState<boolean>(false);
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
                        <Button className={dashboardPageCSS.addButton} startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                            Create Redirect
                        </Button>
                        <AddRedirectModal open={open} handleClose={() => setOpen(false)} />
                    </Grid>
                </Container>
            </PageHeader>
            <PageWrapper pageClass={dashboardPageCSS.root} defaultWrap={false}>
                <Container maxWidth={false} className={dashboardPageCSS.container}>
                    <Grid container className={dashboardPageCSS.grid}>
                        <ClickRedirectLinks />
                        <TotalClicksPie />
                        <EnhancedTable />
                    </Grid>
                </Container>
            </PageWrapper>
        </>
    );
});

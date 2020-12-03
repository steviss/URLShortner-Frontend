import React from 'react';
import { observer } from 'mobx-react';
import Particles from 'react-particles-js';
import { PageWrapper, PageHeader } from '@layout';
import { indexPageStyle } from '@styles';
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';
import { ShortenForm } from '@components';
import { config } from '@utility/config';
import { ReactComponent as HrefSVG } from '@assets/images/href.svg';
import { ReactComponent as PlanningSVG } from '@assets/images/planning.svg';
import { ReactComponent as WebsiteSVG } from '@assets/images/website.svg';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const IndexPage: React.FC = observer(() => {
    const indexPageCSS = indexPageStyle();
    return (
        <>
            <PageHeader className={indexPageCSS.header}>
                <Particles
                    className={indexPageCSS.particles}
                    params={{
                        particles: {
                            number: {
                                value: 50,
                            },
                            size: {
                                value: 3,
                                random: true,
                                anim: {
                                    speed: 4,
                                    size_min: 0.3,
                                },
                            },
                            line_linked: {
                                enable: false,
                            },
                            move: {
                                random: true,
                                speed: 1,
                                direction: 'top',
                                out_mode: 'out',
                            },
                        },
                        interactivity: {
                            events: {
                                onclick: {
                                    enable: true,
                                    mode: 'repulse',
                                },
                            },
                            modes: {
                                repulse: {
                                    distance: 400,
                                    duration: 4,
                                },
                            },
                        },
                    }}
                />
                <Box className={indexPageCSS.cover}>
                    <Container maxWidth="lg" className={indexPageCSS.coverContainer}>
                        <Grid className={indexPageCSS.grid} container>
                            <Paper className={indexPageCSS.formPaper} elevation={3}>
                                <ShortenForm />
                            </Paper>
                        </Grid>
                    </Container>
                </Box>
            </PageHeader>
            <PageWrapper>
                <Paper className={indexPageCSS.landingPaper} square>
                    <Box className={indexPageCSS.landingMessage}>
                        <Typography variant="h1" align="center" className={indexPageCSS.landingHeading}>
                            Free URL Shortener with click counters that lets you track your traffic with ease.
                        </Typography>
                        <Typography variant="body1" align="center" className={indexPageCSS.landingBody}>
                            {config.__APP_NAME__} is one of the best solutions on the market. Helps you vastly improve your marketing and tracking with our dashboard.
                        </Typography>
                    </Box>
                    <Grid container spacing={2} className={indexPageCSS.featureGrid}>
                        <Grid item xs={4} className={indexPageCSS.featureItemContainer}>
                            <Card className={indexPageCSS.featureItem}>
                                <CardContent className={indexPageCSS.featureItemContent}>
                                    <Box className={indexPageCSS.featureItemIcon}>
                                        <HrefSVG />
                                    </Box>
                                    <Typography variant="h3" className={indexPageCSS.featureItemHeading}>
                                        URL Shortner
                                    </Typography>
                                    <Typography variant="body2" component="p" align="center">
                                        Free custom URL Shortener with many features that gives you better quality for links shortening. Shortened URLs will never expire. We do not display ads during
                                        direct redirecting to the original url.
                                    </Typography>
                                </CardContent>
                                <CardActions className={indexPageCSS.featureItemActions}>
                                    <Button size="small" startIcon={<PersonAddIcon />}>
                                        Register
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} className={indexPageCSS.featureItemContainer}>
                            <Card className={indexPageCSS.featureItem}>
                                <CardContent className={indexPageCSS.featureItemContent}>
                                    <Box className={indexPageCSS.featureItemIcon}>
                                        <PlanningSVG />
                                    </Box>
                                    <Typography variant="h3" className={indexPageCSS.featureItemHeading}>
                                        Click Analytics
                                    </Typography>
                                    <Typography variant="body2" component="p" align="center">
                                        Trach each shortened link in real-time and measure its traffic.
                                    </Typography>
                                </CardContent>
                                <CardActions className={indexPageCSS.featureItemActions}>
                                    <Button size="small" startIcon={<PersonAddIcon />}>
                                        Register
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4} className={indexPageCSS.featureItemContainer}>
                            <Card className={indexPageCSS.featureItem}>
                                <CardContent className={indexPageCSS.featureItemContent}>
                                    <Box className={indexPageCSS.featureItemIcon}>
                                        <WebsiteSVG />
                                    </Box>
                                    <Typography variant="h3" className={indexPageCSS.featureItemHeading}>
                                        Dashboard
                                    </Typography>
                                    <Typography variant="body2" component="p" align="center">
                                        Inovative dashboard to provide to your every managment need. We also provide QR codes!
                                    </Typography>
                                </CardContent>
                                <CardActions className={indexPageCSS.featureItemActions}>
                                    <Button size="small" startIcon={<PersonAddIcon />}>
                                        Register
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </PageWrapper>
        </>
    );
});

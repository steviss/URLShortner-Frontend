import React from 'react';
import Particles from 'react-particles-js';
import { PageWrapper, PageHeader } from '@layout';
import { indexPageStyle } from '@styles';
import { Box, Container, Grid, Grow, Paper, Typography, Fade } from '@material-ui/core';
import { FeatureItemCard, ShortenForm, UnclaimedRedirects } from '@components';
import { config } from '@utility/config';
import { ReactComponent as HrefSVG } from '@assets/images/href.svg';
import { ReactComponent as PlanningSVG } from '@assets/images/planning.svg';
import { ReactComponent as WebsiteSVG } from '@assets/images/website.svg';

export const IndexPage: React.FC = () => {
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
                <Grow in={true} unmountOnExit mountOnEnter>
                    <Box className={indexPageCSS.cover}>
                        <Container maxWidth="lg" className={indexPageCSS.coverContainer}>
                            <Grid className={indexPageCSS.grid} container>
                                <Paper className={indexPageCSS.formPaper} elevation={3}>
                                    <ShortenForm />
                                </Paper>
                            </Grid>
                        </Container>
                    </Box>
                </Grow>
            </PageHeader>
            <PageWrapper>
                <UnclaimedRedirects />
                <Fade in={true} unmountOnExit mountOnEnter>
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
                            <FeatureItemCard
                                icon={<HrefSVG />}
                                headline={'CURL Shortner'}
                                body={`Free custom URL Shortener with many features that gives you better quality for links shortening. Shortened URLs will never expire. We do not display ads during direct redirecting to the original url.`}
                            />
                            <FeatureItemCard icon={<PlanningSVG />} headline={'Click Analytics'} body={'Trach each shortened link in real-time and measure its traffic.'} />
                            <FeatureItemCard icon={<WebsiteSVG />} headline={'Dashboard'} body={'Inovative dashboard to provide to your every managment need. We also provide QR codes!'} />
                        </Grid>
                    </Paper>
                </Fade>
            </PageWrapper>
        </>
    );
};

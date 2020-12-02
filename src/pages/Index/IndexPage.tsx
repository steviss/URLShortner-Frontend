import React from 'react';
import { observer } from 'mobx-react';
import Particles from 'react-particles-js';
import { PageWrapper, PageHeader } from '@layout';
import { indexPageStyle } from '@styles';
import { Container, Grid, Paper } from '@material-ui/core';
import { ShortenForm } from '@components';

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
                <div className={indexPageCSS.cover}>
                    <Container maxWidth="lg" className={indexPageCSS.coverContainer}>
                        <Grid className={indexPageCSS.grid} container>
                            <Paper className={indexPageCSS.formPaper} elevation={3}>
                                <ShortenForm />
                            </Paper>
                        </Grid>
                    </Container>
                </div>
            </PageHeader>
            <PageWrapper></PageWrapper>
        </>
    );
});

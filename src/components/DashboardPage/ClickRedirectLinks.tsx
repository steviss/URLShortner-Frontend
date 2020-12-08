import { Grid, Paper, Zoom, useTheme, useMediaQuery } from '@material-ui/core';
import { ResponsiveBar } from '@nivo/bar';
import { useStore } from '@stores';
import { perRedirectChartStyle } from '@styles';
import stringToColor from '@utility/randomColor';
import { observer } from 'mobx-react';
import React from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const ClickRedirectLinks = observer(() => {
    const redirectChartCSS = perRedirectChartStyle();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const {
        redirectStore: { items },
    } = useStore();
    const generateData = () => {
        let data = items.map((item) => {
            return {
                url: item.url,
                clicks: item.clicks.length,
                colorOne: stringToColor(`${item.url}+${item.slug}`),
                value: item.clicks.length,
            };
        });
        return data;
    };
    return (
        <Zoom in={items.length > 0}>
            <Grid item xs={12} sm={12} md={6} lg={9} className={redirectChartCSS.root}>
                <Paper square className={redirectChartCSS.paper}>
                    <ResponsiveBar
                        animate={false}
                        data={generateData()}
                        keys={['clicks']}
                        indexBy="url"
                        margin={{ top: 60, right: 20, bottom: 60, left: 60 }}
                        padding={0.4}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'linearGradient',
                                colors: [
                                    { offset: 0, color: theme.palette.primary.light },
                                    { offset: 100, color: theme.palette.primary.main },
                                ],
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'clicks',
                                },
                                id: 'dots',
                            },
                        ]}
                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={
                            matches
                                ? {
                                      tickSize: 5,
                                      tickPadding: 5,
                                      tickRotation: 0,
                                      legend: 'url',
                                      legendPosition: 'middle',
                                      legendOffset: 32,
                                  }
                                : null
                        }
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'clicks',
                            legendPosition: 'middle',
                            legendOffset: -40,
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </Paper>
            </Grid>
        </Zoom>
    );
});

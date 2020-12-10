import { Box, Divider, Grid, Paper, Skeleton, Typography, useMediaQuery, useTheme, Zoom } from '@material-ui/core';
import { ResponsivePie } from '@nivo/pie';
import { useStore } from '@stores';
import { totalClickPieStyle } from '@styles';
import stringToColor from '@utility/randomColor';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { TCSkeleton } from '@skeletons';

interface LabelType {
    match: {
        id: string;
    };
    id: 'labels';
}

interface UrlType {
    match: {
        id: string;
    };
    id: 'urls';
}

interface DataType {
    id: string;
    label: string;
    value: number;
    color: string;
}

export const TotalClicksPie = observer(() => {
    const pieChartCSS = totalClickPieStyle();
    const [totalClicks, setTotalClicks] = useState<number>(0);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const {
        redirectStore: { items },
    } = useStore();
    const generateFill = () => {
        let labelArray: LabelType[] = [],
            urlArray: UrlType[] = [];
        items.forEach((item) => {
            let lineObject = Object.assign({ match: { id: item.slug } }) as LabelType,
                dotObject = Object.assign({ match: { id: item.url } }) as UrlType;
            labelArray.push(lineObject);
            urlArray.push(dotObject);
        });
        return [...labelArray, ...urlArray];
    };
    const generateData = () => {
        let data: DataType[] = items.map((item) => {
            return {
                id: item.slug,
                label: item.url,
                color: stringToColor(`${item.url}+${item.slug}`),
                value: item.clicks.length,
            } as DataType;
        });
        return data;
    };
    useEffect(() => {
        let currentClicks = 0;
        items.forEach((item) => {
            currentClicks = currentClicks + item.clicks.length;
        });
        setTotalClicks(currentClicks);
        return () => {
            setTotalClicks(0);
        };
    }, [items]);
    return (
        <Zoom in={true} unmountOnExit mountOnEnter>
            <Grid item xs={12} sm={12} md={6} lg={3} className={pieChartCSS.root}>
                <Paper square className={pieChartCSS.paper}>
                    <Box component="header" className={pieChartCSS.header}>
                        {items.length > 0 ? (
                            <Typography variant="h4" className={pieChartCSS.heading}>
                                Total clicks: {totalClicks}
                            </Typography>
                        ) : (
                            <Skeleton width="5rem" height="1rem" />
                        )}
                    </Box>
                    <Divider />
                    {items.length > 0 ? (
                        <ResponsivePie
                            enableRadialLabels={matches}
                            data={generateData()}
                            margin={{ top: 60, right: 80, bottom: 100, left: 100 }}
                            innerRadius={0.5}
                            colors={{ scheme: 'nivo' }}
                            borderWidth={2}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            radialLabelsSkipAngle={10}
                            radialLabelsTextColor="#333333"
                            radialLabelsLinkColor={{ from: 'color' }}
                            sliceLabelsSkipAngle={10}
                            sliceLabelsTextColor="#333333"
                            defs={[
                                {
                                    id: 'urls',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true,
                                },
                                {
                                    id: 'labels',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10,
                                },
                            ]}
                            fill={generateFill()}
                        />
                    ) : (
                        <Box className={pieChartCSS.container}>
                            <TCSkeleton />
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Zoom>
    );
});

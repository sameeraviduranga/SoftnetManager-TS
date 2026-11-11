import { styled } from '@mui/material/styles';
import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import PieChartWithPaddingAngle from '../charts/pie';
import SimpleAreaChart from '../charts/areachart';
import SimpleLineChart2 from '../charts/linechart';
import StickyHeadTable from '../charts/table';
import useAuth from '@/core/hooks/useAuth';


const MyBox = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027'
    }),
    height: '300px'
}));

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

function Dashboard() {

    return (
        <Grid container spacing={2}>
            <Grid container size={12} spacing={2}>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                    <MyBox>
                        <BarChart
                            series={[
                                { data: pData, label: 'pv', id: 'pvId' },
                                { data: uData, label: 'uv', id: 'uvId' },
                            ]}
                            xAxis={[{ data: xLabels, height: 28 }]}
                            yAxis={[{ width: 50 }]}
                        />
                    </MyBox>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                    <MyBox><PieChartWithPaddingAngle /></MyBox>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                    <MyBox><SimpleAreaChart /></MyBox>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                    <MyBox><SimpleLineChart2 /></MyBox>
                </Grid>

            </Grid>
            <Grid size={12}>
                <StickyHeadTable />
            </Grid>
        </Grid>
    )
}

export default Dashboard
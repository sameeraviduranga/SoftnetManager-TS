import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

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

export default function SimpleLineChart2() {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <LineChart
        height={250}
        series={[
          { data: pData, label: 'pv' },
          { data: uData, label: 'uv' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}
        yAxis={[{ width: 45 }]}
        margin={{ top: 10, bottom: 20, left: 40, right: 15 }} // Complete margin object එකක් යොදන්න
      />
    </Box>
  );
}
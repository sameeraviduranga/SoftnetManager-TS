import { Analytics, MoneySharp, Person, ShoppingCart } from '@mui/icons-material'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import PieChartWithCenterLabel from '../charts/piechart'




function Account() {
    return (
        <Grid container size={12} rowSpacing={2} columnSpacing={2} sx={{ width: '100%', m: 0, boxSizing: 'border-box' }}>
            <Grid container spacing={2} size={12}>
                <Grid size={{ xl: 3, md: 6, xs: 12 }}>
                    <Paper elevation={3} sx={{ minHeight: 120, p: 2.5, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>

                            <Avatar sx={{ background: 'linear-gradient(180deg, #bfb6eb 20%, #7a6cf7)', color: '#2f0d8a', width: 100, height: 100, borderRadius: 2 }} variant='rounded'><Person sx={{ fontSize: 60 }} /></Avatar>

                            <Box sx={{ minWidth: 0, ml: 3, textAlign: 'center' }}>
                                <Typography variant="h5" noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>Customer</Typography>
                                <Typography variant="h3" fontWeight="bold" sx={{ mt: 0.5 }} noWrap>
                                    15,000
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xl: 3, md: 6, xs: 12 }}>
                    <Paper elevation={3} sx={{ minHeight: 120, p: 2.5, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>

                            <Avatar sx={{ background: 'linear-gradient(180deg, #d8f5b2 20%, #7bf045)', color: '#2E7D32', width: 100, height: 100, borderRadius: 2 }} variant='rounded'><MoneySharp sx={{ fontSize: 60 }} /></Avatar>

                            <Box sx={{ minWidth: 0, ml: 3, textAlign: 'center' }}>
                                <Typography variant="h5" noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>Portfolio</Typography>
                                <Typography variant="h3" fontWeight="bold" sx={{ mt: 0.5 }} noWrap>
                                    15.5 BN
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xl: 3, md: 6, xs: 12 }}>
                    <Paper elevation={3} sx={{ minHeight: 120, p: 2.5, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>

                            <Avatar sx={{ background: 'linear-gradient(180deg, #f7f1bc 20%, #fdee66)', color: '#aca107', width: 100, height: 100, borderRadius: 2 }} variant='rounded'><Analytics sx={{ fontSize: 60 }} /></Avatar>

                            <Box sx={{ minWidth: 0, ml: 3, textAlign: 'center' }}>
                                <Typography variant="h5" noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>Capital</Typography>
                                <Typography variant="h3" fontWeight="bold" sx={{ mt: 0.5 }} noWrap>
                                    120 Mn
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xl: 3, md: 6, xs: 12 }}>
                    <Paper elevation={3} sx={{ minHeight: 120, p: 2.5, borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>

                            <Avatar sx={{ background: 'linear-gradient(180deg, #ebcece 20%, #dd4c4c)', color: '#da0a0a', width: 100, height: 100, borderRadius: 2 }} variant='rounded'><ShoppingCart sx={{ fontSize: 60 }} /></Avatar>

                            <Box sx={{ minWidth: 0, ml: 3, textAlign: 'center' }}>
                                <Typography variant="h5" noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>Customer</Typography>
                                <Typography variant="h3" fontWeight="bold" sx={{ mt: 0.5 }} noWrap>
                                    15,000
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>

                {/* Left Side Table */}
                <Grid size={{ xs: 12, xl: 8 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            minWidth: 0, // Flex inner shrink සඳහා අත්‍යවශ්‍යයි
                            minHeight: 120,
                            p: 3,
                            borderRadius: 1,
                            overflow: 'hidden' // Content එක එළියට පැනීම වළක්වයි
                        }}
                    >

                    </Paper>
                </Grid>

                {/* Right Side Charts */}
                <Grid size={{ xs: 12, xl: 4 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            minWidth: 0, // Flex inner shrink සඳහා අත්‍යවශ්‍යයි
                            minHeight: 120,
                            p: 3,
                            borderRadius: 1,
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', minWidth: 0 }}>
                            <Box sx={{ width: '100%', minWidth: 0 }}>

                            </Box>
                            <Box sx={{ width: '100%', minWidth: 0 }}>

                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Account
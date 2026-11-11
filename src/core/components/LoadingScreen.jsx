import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

function LoadingScreen() {
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
        }}>
            <CircularProgress />
            <Typography>Loading...</Typography>
        </Box>
    )
}

export default LoadingScreen
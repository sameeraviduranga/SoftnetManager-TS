import { Box, createTheme, styled, TextField, ThemeProvider, Typography } from '@mui/material'
import { lime, purple } from '@mui/material/colors';
import React from 'react'



function DrawerInfo({ icon, label, value, ...other }) {

    return (

        <Box>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>{icon} {label}</Typography>
            <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 500 }}>{value}</Typography>
        </Box>

    )
}

export default DrawerInfo
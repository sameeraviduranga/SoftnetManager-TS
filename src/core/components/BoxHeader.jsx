import { Box, colors } from '@mui/material'
import React from 'react'

function BoxHeader({ children, props }) {
    return (
        <Box sx={{ backgroundColor: 'whitesmoke', p: 2, display: 'flex', alignContent: 'center', }}{...props}>
            {children}
        </Box>
    )
}

export default BoxHeader
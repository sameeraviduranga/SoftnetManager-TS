import { Box, Paper } from '@mui/material'
import React from 'react'

function BoxContainer({ children, props }) {
    return (

        <Box sx={{}} {...props}>

            {children}

        </Box>

    );
}

export default BoxContainer
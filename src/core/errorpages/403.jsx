import React from 'react'
import { Box, Typography } from '@mui/material'

function Error403() {
    return (
        <Box
            sx={{
                textAlign: "center",
                mt: 10
            }}
        >

            <Typography variant="h2" sx={{ color: 'red' }}>
                403
            </Typography>

            <Typography variant="h5">
                Access Denied
            </Typography>

            <Typography>
                You don't have permission
                to access this page.
            </Typography>

        </Box>
    )
}

export default Error403
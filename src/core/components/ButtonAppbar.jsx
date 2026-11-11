
import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React from 'react'


function ButtonAppbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <IconButton sx={{
                        color: 'inherit'
                    }}>
                        <Menu />
                    </IconButton>
                    <Typography component='div' sx={{ flexGrow: 1 }}>SOFTNET</Typography>
                    <Button sx={{ color: 'inherit' }}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default ButtonAppbar
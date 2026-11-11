import React from 'react'
import ResponsiveAppbar from '@/core/components/ResponsiveAppbar'
import ResposiveDrawer from '@/core/components/ResposiveDrawer'
import { Outlet } from 'react-router-dom'
import { Box, CssBaseline, Toolbar } from '@mui/material'



function MainLayout() {
    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
        }}>
            <CssBaseline />
            <ResposiveDrawer />
            <Box sx={{ display: 'flex', minWidth: 0, flexGrow: 1, flexDirection: 'column', position: 'relative' }}>
                <ResponsiveAppbar />

                <Box component='main' sx={{ flexGrow: 1, p: 3, minWidth: 0, overflow: 'auto', }}>
                    <Outlet />
                </Box>
            </Box>
        </Box >
    )
}

export default MainLayout
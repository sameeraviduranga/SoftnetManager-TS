import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, MenuItem, Menu, Button, TextField, InputAdornment, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import logo from '@/assets/images/logo.jpg'
import userImg from '@/assets/images/b1.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { Dashboard, Home, Logout, Pages, Person, Search, Settings } from '@mui/icons-material';
import useAuth from '../hooks/useAuth';
import getImageUrl from '../utils/imageUtils';


const pages = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        permission: 'Dashboard.Read'
    },
    {
        name: 'Customers',
        path: 'customers',
        permission: 'Customer.Read'
    },
    {
        name: 'Reports',
        path: 'reports',
        permission: 'Report.Read'
    },
    {
        name: 'Analytics',
        path: 'analytics',
        permission: 'Analytics.Read'
    },
    {
        name: 'Product View',
        path: 'product',
        permission: 'Product.Read'
    },
    {
        name: 'Product Create',
        path: 'product-create',
        permission: 'Product.Create'
    }


]





const profile = [{ name: 'Settings', icon: <Home /> }, { name: 'LogOut', icon: <Logout /> }]




function ResponsiveAppbar() {
    const { logout, user, Profile } = useAuth();
    const visiblePages = pages.filter(page => user?.permissions?.includes(page.permission));
    //console.log(visiblePages)

    const profileImage = getImageUrl("uploads/profileImages", Profile.UserProfile.ProfileImageUrl, "cff2e6ab-3478-4932-8c39-98bd73182eda_b1.jpg");





    const navigate = useNavigate();

    //console.log(user);
    const [anchorNavEl, setAnchorNavEl] = useState(null)
    const [anchorProfileEl, setAnchorProfileEl] = useState(null);

    const handleOpenMenuNav = (event) => {
        setAnchorNavEl(event.currentTarget);
    }
    const handleCloseMenuNav = (event) => {
        setAnchorNavEl(null);
    }

    const handleOpenProfileNav = (event) => {
        setAnchorProfileEl(event.currentTarget);
    }

    const handleCloseProfileNav = (event) => {
        setAnchorProfileEl(null);
    }

    const handleLogout = async (event) => {

        await logout();
        navigate('/login');
    }



    return (

        <AppBar position="sticky" sx={{ zIndex: 1 }}>
            <Toolbar>
                {/* add menu */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontFamily: 'Inter, sans-serif' }}>
                    <IconButton sx={{ color: 'inherit' }} onClick={handleOpenMenuNav}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorNavEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorNavEl)}
                        onClose={handleCloseMenuNav}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.name} onClick={handleCloseMenuNav}>{page.name}</MenuItem>
                        ))}
                    </Menu>
                </Box>
                {/* <Box sx={{ display: 'flex', flexGrow: { xs: 1, md: 0 }, justifyContent: { xs: 'center' }, mr: 5 }}>
                    <IconButton sx={{ p: '0', mr: 1, }}>
                        <Avatar alt='' src={logo} variant='rounded' />
                    </IconButton>
                    <Typography variant="h6">
                        SOFTNET
                    </Typography>
                </Box> */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
                    {visiblePages.map((page) => (
                        <Button key={page.name} component={Link} to={`/main/${page.path.toString()}`} color='inherit' sx={{ display: 'inline-block' }}>{page.name}</Button>
                    ))}
                </Box>

                <Typography variant='body1' sx={{ mr: 3 }} color=''>Wellcome,{Profile.UserProfile.FirstName}</Typography>

                <TextField size='small' sx={{
                    backgroundColor: 'ButtonFace',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' }, // Border එක අයින් කිරීමට (Optional)
                    },
                    mr: 2
                }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment><Search /></InputAdornment>
                        }
                    }}


                />

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title='account info'>
                        <IconButton aria-label="" onClick={handleOpenProfileNav} >
                            <Avatar alt='' src={profileImage} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorProfileEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}

                        keepMounted

                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}

                        open={Boolean(anchorProfileEl)}
                        onClose={handleCloseProfileNav}
                    >
                        <MenuItem> <Person /> Profile</MenuItem>
                        <MenuItem> <Settings />Settings</MenuItem>
                        {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
                    </Menu>
                </Box>


            </Toolbar>
        </AppBar>

    )
}

export default ResponsiveAppbar
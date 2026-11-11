import React, { Fragment, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react';
import { Avatar, Box, Collapse, colors, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, TextField, Typography, Menu, Popover, Tooltip, Fade, useTheme, useMediaQuery } from '@mui/material';
import user from '@/assets/images/b1.jpg'
import { drawerWidth } from '@/layout/layoutConstant';
import { AccountBox, Analytics, ChevronLeftRounded, ChevronRightRounded, DarkMode, Dashboard, Favorite, KeyboardArrowDown, KeyboardArrowDownOutlined, KeyboardArrowUp, KeyboardArrowUpOutlined, LightMode, Logout, Person3, ReportSharp, Search, Shop2, Tune, TurnedIn, Wallet } from '@mui/icons-material';
import logo from '@/assets/images/logo.jpg'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuthorization from '../hooks/useAuthorization';
import { mainMenuItems } from '@/core/constants/menuItems';
import { ChevronDown, ChevronUp, ListEndIcon } from 'lucide-react';
import SubMenuListItem from './subMenuListItem';
import useAuth from '@/core/hooks/useAuth';



function ResposiveDrawer() {
    const [open, setOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));


    //to open submenu
    const [mainMenuItem, setMainMenuItem] = useState(null);//defint main menu id
    const [activeMainItem, setActiveMainItem] = useState(null);
    const [activeSubItem, setActiveSubItem] = useState(null);//defind selected submenu name
    const [subMenuAnchorEl, setsubMenuAnchorEl] = useState(null);//defind selected submenu name

    useEffect(() => {
        if (isMobile) {
            setOpen(false);
            handleCloseSubmenu();
        } else {
            setOpen(true);
        }
    }, [isMobile]);

    const handleToggleDrawer = () => {
        setOpen((prev) => {
            if (prev) {
                handleCloseSubmenu();
            }
            return !prev;
        })
    }

    const handleOpenSubMenu = (event, id) => {
        setMainMenuItem((prev) => (prev === id ? null : id));
        setsubMenuAnchorEl(event.currentTarget);
        setActiveMainItem(id);
        console.log(id)
    }

    const handleCloseSubmenu = () => {
        setMainMenuItem(null);
        setsubMenuAnchorEl(null);
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const { can } = useAuthorization();

    //themecolors
    const themeColors = {
        bgColor: darkMode ? '#272626' : '#ffffff',
        color: darkMode ? '#f7efef' : '#807d7d',
        titleColor: darkMode ? '#fff' : '#333',
        searchBg: darkMode ? '#444343' : '#faf7f7',
        activeBg: '#3778D3',
        activeColor: '#f7f1f1',
        hoverBg: darkMode ? '#3a3b3c' : '#f6f5ff',
        subMenuActiveBgColor: '#3a3b3c',
        subMenuActiveColor: '#f8f4f4',
        subMenuHoverBgColor: '#e8e8e9',
        activesubMenuHoverBgColor: '#2d2d2e',
        activesubMenuHoverColor: '#f8f4f4',

    }

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, path: 'dashboard' },
        { id: 'account', label: 'Account', icon: <AccountBox />, path: 'account', permission: 'Product.Read' },
        { id: 'customers', label: 'Customers', icon: <Person3 />, path: 'customers', permission: 'Customers.Read' },
        { id: 'branches', label: 'Branches', icon: <Shop2 />, path: 'branches', permission: 'Branches.Read' },
        { id: 'analytics', label: 'Analytics', icon: <Analytics />, path: 'analytics', permission: 'Analytics.Read' },
        { id: 'reports', label: 'Reports', icon: <ReportSharp />, path: 'reports', permission: 'Reports.Read' },
        { id: 'likes', label: 'Likes', icon: <Favorite />, path: 'likes', permission: 'Likes.Read' },
        { id: 'wallet', label: 'Wallet', icon: <Wallet />, path: 'wallet', permission: 'Wallet.Read' },
    ];


    const selectedMenus = mainMenuItems
        .filter(Boolean)
        .map((mainMenu) => ({ ...mainMenu, subMenus: mainMenu.subMenus.filter((sub) => can(sub.permission)) }))
        .filter((mainMenu) => mainMenu.subMenus.length > 0)








    const visiblePages = menuItems.filter(page => {
        if (!page.permission) {
            return true;
        }

        return can(page.permission);
    });




    return (
        <Box sx={{
            width: open ? 300 : 100,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            //justifyContent: 'space-between',
            position: 'relative',
            transition: 'all 0.3s ease',
            bgcolor: themeColors.bgColor,
            color: themeColors.color,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
            fontFamily: 'Inter, sans-serif',
            zIndex: 2,
            p: 2,
            flexShrink: 0,
            boxSizing: 'border-box'

        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={logo} sx={{ width: 50, height: 50 }} variant='rounded'></Avatar>
                {open && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1, boxSizing: 'border-box', pr: 3 }}>
                        <Typography variant='body1' sx={{ fontWeight: 600, color: themeColors.titleColor, lineHeight: 1.5 }}>Sofnet Manager</Typography>
                        <Typography variant='caption' sx={{}}>World biggest stock market</Typography>
                    </Box>
                )}
                <IconButton
                    onClick={() => handleToggleDrawer()}
                    sx={{
                        color: '#FFFFF',
                        position: 'absolute',
                        right: -25,
                        top: 10,
                        zIndex: 3,
                        borderRadius: 2,
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                        bgcolor: '#4482da',
                        '&:hover': {
                            bgcolor: '#4482da'
                        }

                    }}>
                    {open ? <ChevronLeftRounded sx={{ fontSize: 30 }} /> : <ChevronRightRounded sx={{ fontSize: 30 }} />}
                </IconButton>
            </Box>

            {/* =============== search bar ========================*/}

            <Box sx={{ mb: 2 }}>
                {open ? (
                    <TextField
                        placeholder='Search..'
                        variant='outlined'
                        fullWidth
                        size='small'
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position='end'><IconButton sx={{
                                    '&:hover': {
                                        bgcolor: 'inherit'
                                    }
                                }}><Search /></IconButton></InputAdornment>,
                                sx: {
                                    bgcolor: themeColors.searchBg,
                                    borderRadius: '8px',
                                    '& fieldset': { border: 'none' },
                                    color: themeColors.color
                                }

                            }

                        }}

                    />
                ) : (
                    <IconButton sx={{ bgcolor: themeColors.bgColor, width: '100%', borderRadius: '8px', p: 1 }}>
                        <Search sx={{ color: themeColors.color }} />
                    </IconButton>
                )}
            </Box>



            <List component='nav' sx={{ flexGrow: 1, p: 0 }}>
                {selectedMenus.map((MenuItem) => {
                    const isOpenSubmenu = mainMenuItem === MenuItem.id;
                    const isActive = activeMainItem === MenuItem.id;
                    return (
                        <Tooltip
                            key={MenuItem.id}
                            title={!open && !isOpenSubmenu && MenuItem.label}
                            placement='left-end'
                            arrow
                            slots={{
                                transition: Fade
                            }}
                            slotProps={{
                                transition: { timeout: 600 }
                            }}

                        >
                            <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
                                <ListItemButton onClick={(event) => handleOpenSubMenu(event, MenuItem.id)} sx={{
                                    minHeight: 48,
                                    borderRadius: '8px',
                                    px: 2.5,
                                    justifyContent: open ? 'initial' : 'center',
                                    bgcolor: isActive ? themeColors.activeBg : 'transparent',
                                    color: isActive ? themeColors.activeColor : themeColors.color,
                                    '&:hover': {
                                        bgcolor: isActive ? themeColors.activeBg : themeColors.hoverBg,
                                        color: isActive ? themeColors.activeColor : themeColors.titleColor,
                                        '& .MuiListItemIcon-root': { color: isActive ? themeColors.activeColor : themeColors.titleColor }
                                    },
                                    transition: '0.2s'

                                }}>
                                    <ListItemIcon sx={{
                                        color: isActive ? themeColors.activeColor : themeColors.color,
                                    }}>
                                        {MenuItem.icon}
                                    </ListItemIcon>
                                    {open && <ListItemText primary={MenuItem.label} />}
                                    {isOpenSubmenu ? (<KeyboardArrowUpOutlined />) : (<KeyboardArrowDownOutlined />)}
                                </ListItemButton>
                                {/* dropdown and menus */}
                                {open ? (
                                    <Collapse in={isOpenSubmenu} timeout='auto' unmountOnExit sx={{ boxShadow: 'inherit' }}>
                                        <List component='div' sx={{ ml: 5 }}>
                                            {MenuItem.subMenus.map((subMenuItem) => {
                                                return (
                                                    <SubMenuListItem
                                                        key={subMenuItem.id}
                                                        menuItem={MenuItem}
                                                        submenuItem={subMenuItem}
                                                        open={open}
                                                        themeColors={themeColors}
                                                        activeItem={activeSubItem}
                                                        onSelectSubmenu={() => setActiveSubItem(subMenuItem.id)}
                                                    />
                                                )

                                            })}
                                        </List>
                                    </Collapse>
                                ) : (
                                    <Popover
                                        open={isOpenSubmenu && !open}
                                        anchorEl={subMenuAnchorEl}
                                        onClose={handleCloseSubmenu}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        disableRestoreFocus
                                        slotProps={{
                                            paper: {
                                                sx: {
                                                    ml: 1,
                                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                                                    borderRadius: '8px',
                                                    bgcolor: themeColors.bgColor,
                                                    color: themeColors.color
                                                }
                                            }
                                        }}
                                        sx={{
                                            pointerEvents: 'none', // Popover එකෙන් වෙනත් Clicks Block කිරීම නවත්වයි
                                        }}
                                    >
                                        <List sx={{ pointerEvents: 'auto', p: 1 }}>
                                            {MenuItem.subMenus.map((subMenuItem) => {

                                                return (
                                                    <SubMenuListItem
                                                        key={subMenuItem.id}
                                                        menuItem={MenuItem}
                                                        submenuItem={subMenuItem}
                                                        open={open}
                                                        themeColors={themeColors}
                                                        activeItem={activeSubItem}
                                                        onSelectSubmenu={() => {
                                                            setActiveSubItem(subMenuItem.id);
                                                            handleCloseSubmenu();
                                                        }}
                                                    />
                                                );
                                            })}
                                        </List>
                                    </Popover>
                                )}
                            </ListItem>
                        </Tooltip>
                    );
                })}
            </List>




            {/* toggle mode and logout */}

            <Box sx={{ pt: 1, borderTop: `1px solid ${darkMode ? '#3a3b3c' : '#f0f0f0'}` }}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            mb: 1,
                            borderRadius: '8px',
                            color: themeColors.color,
                            '&:hover': {
                                bgcolor: themeColors.hoverBg,
                                color: themeColors.titleColor
                            }
                        }}>
                        <ListItemIcon sx={{
                            minWidth: 0,
                            justifyContent: open ? 'initial' : 'center',
                            mr: open ? 2 : 'auto',
                            color: 'inherit'
                        }}><Logout /></ListItemIcon>
                        {open && <ListItemText primary="Logout" />}
                    </ListItemButton>
                </ListItem>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    p: open ? '8px 12px' : '12px 0px',
                    bgcolor: themeColors.hoverBg,
                    borderRadius: '8px',
                    transition: '0.3s'
                }}>
                    {darkMode ? <DarkMode sx={{ color: themeColors.color }} /> : <LightMode sx={{ color: themeColors.color }} />}
                    {open && (
                        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: themeColors.titleColor }}>{darkMode ? "Dark Mode" : "Light Mode"}</Typography>
                    )}
                    <Switch onClick={() => setDarkMode(!darkMode)}
                        size={open ? "medium" : "small"}
                        sx={{ ml: open ? 0 : 0 }}
                    />
                </Box>
            </Box>



        </Box >
    )
}

export default ResposiveDrawer
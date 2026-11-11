import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";

export default function SubMenuListItem({ menuItem, submenuItem, activeItem, open, themeColors, onSelectSubmenu }) {
    const isSubmenuActive = activeItem === submenuItem.id;
    return (
        <ListItem disablePadding component={Link} to={`/main/${menuItem.path}/${submenuItem.path}`} sx={{ display: 'block' }}>
            <ListItemButton onClick={onSelectSubmenu} sx={{
                minHeight: 48,
                borderRadius: '4px',
                px: 2,
                justifyContent: open ? 'initial' : 'center',
                color: themeColors.color,
                fontSize: isSubmenuActive ? '50px' : '30px',
                fontWeight: isSubmenuActive && 'bold',
                '& .MuiTypography-root': {
                    color: isSubmenuActive ? themeColors.activeBg : themeColors.color,
                    fontWeight: isSubmenuActive ? 'bold' : 'normal',
                    transition: 'font-weight 0.2s ease'
                },
                '&:hover': {

                    // bgcolor: isSubmenuActive ? themeColors.activesubMenuHoverBgColor : themeColors.subMenuHoverBgColor,
                    // color: isSubmenuActive ? themeColors.activesubMenuHoverColor : themeColors.titleColor
                }

            }}>
                <ListItemText primary={submenuItem.label} />
            </ListItemButton>
        </ListItem>
    );
}
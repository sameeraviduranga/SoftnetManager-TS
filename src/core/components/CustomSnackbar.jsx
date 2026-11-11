import { Alert, Fade, Grow, Snackbar, Slide } from '@mui/material'
import React from 'react'

function CustomSnackbar({
    open,
    autoHideDuration,
    onClose,
    message,
    severity,
    color,
    variant,
    icon,

    ...other


}) {
    function SlideTransition(props) {
        return <Slide {...props} direction="down" />;
    }



    return (
        <React.Fragment>
            <Snackbar

                open={open}
                autoHideDuration={autoHideDuration}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}

                sx={{
                    position: 'relative',
                    top: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'max-content',
                    maxWidth: '90%',
                    zIndex: 1500
                }}
                {...other}
                slots={{
                    transition: SlideTransition
                }}
                slotProps={{
                    transition: {
                        timeout: { enter: 500, exit: 300 }, // Enter සහ Exit වෙන වෙනම
                    },
                }}
            >

                <Alert
                    icon={icon}
                    onClose={onClose}
                    severity={severity}
                    color={color}
                    variant={variant}
                    sx={{
                        width: '100%',
                        borderRadius: 2
                    }}
                    elevation={6}
                >
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment>

    )
}

export default CustomSnackbar
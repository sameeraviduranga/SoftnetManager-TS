import { Button, colors } from '@mui/material'
import React from 'react'

function CustomButton({ children, component, variant = "contained", color, sx, ...props }) {

    return (
        <Button

            variant={variant}
            component={component}

            sx={{
                backgroundColor: color ? color : 'primary.main',
                color: 'white',
                '&:hover': {
                    backgroundColor: color ? color : 'primary.dark',
                },
                ...sx
            }} {...props}>

            {children}
        </Button>
    )
}

export default CustomButton
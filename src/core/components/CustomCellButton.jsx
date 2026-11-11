import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React from 'react'

const CellButton = styled(Button)(({ theme }) => ({

    color: '#5c5a5a',
    backgroundColor: 'white',
    borderRadius: '25px',
    fontSize: '16px',
    textTransform: 'none', // අකුරු සියල්ල Capital වීම වළක්වයි
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
        backgroundColor: '#c0bfbe', // Mouse එක hover කරන විට වෙනස් වන පාට
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
    },
}));


export function mybutton(prop) {

}

export default CellButton
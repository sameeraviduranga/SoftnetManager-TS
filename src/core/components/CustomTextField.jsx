import { TextField } from '@mui/material'
import React from 'react'

function CustomTextField(props) {
    const {
        value,
        variant = 'outlined',
        type = 'text',
        name,
        error = false,
        helperText = '',
        slotProps,
        autoComplete = 'off',
        sx,
        onChange,
        onBlur,
        ref,
        ...otherProps } = props;

    return (
        <TextField
            fullWidth
            variant={variant}
            autoComplete={autoComplete}
            value={value ?? ''}
            name={name} // undefined හෝ null වුණොත් "" බවට පත්වේ
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={error}
            helperText={helperText}
            slotProps={slotProps}
            type={type}
            {...otherProps}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                        borderColor: '#E2E8F0',
                        borderWidth: '1px',
                        transition: 'all 0.2s ease-in-out',
                    },
                    '&:hover fieldset': {
                        borderColor: 'grey.600',
                        borderWidth: '1px',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: '1.5px',
                    },
                },
                '& .MuiOutlinedInput-input': {
                    fontSize: '0.875rem',
                    color: '#1E293B',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    padding: '10px 14px',
                },
                '& .MuiInputLabel-root': {
                    fontSize: '0.875rem',
                    color: '#6B7280',
                    fontFamily: "'Inter', sans-serif",
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main',
                    fontWeight: 600,
                },
                ...sx
            }}
        />
    )
}

export default React.memo(CustomTextField)
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function CustomSelect({ items = [],
    name, label,
    value,
    onChange,
    disabled = false,
    error,
    helperText,
    valueKey = 'Id',
    labelkey = 'Name',
    sx,
    ...props }) {

    const labelId = name ? `${name}-label` : undefined;

    return (

        <FormControl
            fullWidth
            error={error}
            disabled={disabled}
            size='small'
            {...props}

            sx={{
                "& .MuiOutlinedInput-root": {
                    height: "40px",
                    borderRadius: "8px",

                    "& fieldset": {
                        borderColor: "#E2E8F0",
                        borderWidth: "1px",
                        transition: "all 0.2s ease-in-out",
                    },

                    "&:hover fieldset": {
                        borderColor: "grey.600",
                        borderWidth: "1px",
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                        borderWidth: "1.5px",
                    },
                },

                "& .MuiSelect-select": {
                    fontSize: "0.875rem",
                    color: "#1E293B",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    padding: "10px 14px",
                    minHeight: "unset !important",
                },

                "& .MuiInputLabel-root": {
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    fontFamily: "'Inter', sans-serif",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main",
                    fontWeight: 600,
                },

                ...sx,
            }}>
            {label && <InputLabel id={labelId}>{label}</InputLabel>}
            <Select labelId={labelId} name={name} value={value ?? ''} label={label} onChange={onChange}>
                {items.map((item, index) => {

                    return (
                        <MenuItem key={item[valueKey]} value={item[valueKey]}>{item[labelkey]}</MenuItem>
                    );
                })}
            </Select>
            {helperText && (
                <FormHelperText>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    )
}

export default CustomSelect
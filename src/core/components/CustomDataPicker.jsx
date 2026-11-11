import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CustomDataPicker({ value, label, name, error, helperText, ref, onChange, onBlur, ...others }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={value ?? null}
                name={name}
                onChange={onChange}
                {...others}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        size: 'small',
                        error: error,         // දෝෂයක් ඇත්නම් true ලෙස ලබා දීමට
                        helperText: helperText, // පෙන්විය යුතු පණිවිඩය ලබා දීමට
                    }
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",

                        "& fieldset": {
                            borderColor: "#E2E8F0",
                            borderWidth: "1px",
                            transition: "all 0.2s ease-in-out",
                        },

                        "&hover fieldset": {
                            borderColor: "grey.600",
                            borderWidth: "1px",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "1.5px",
                        },
                    },

                    "& .MuiOutlinedInput-input": {
                        fontSize: "0.875rem",
                        color: "#1E293B",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        padding: "10px 14px",
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
                }}
            />
        </LocalizationProvider>
    )
}

export default CustomDataPicker
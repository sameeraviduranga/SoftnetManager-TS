
import { Box, Button, colors, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import loginbackground from '@/assets/images/login-back.jpg'
import loginbackground2 from '@/assets/images/login-back2.jpg'
import CustomTextField from '@/core/components/CustomTextField';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/core/hooks/useAuth';


function RegisterPage() {

    const { registering, register } = useAuth();
    const navigate = useNavigate();

    const [errorMessage, seterrorMessage] = useState("")
    const [newUser, setNewUser] = useState({ FirstName: '', LastName: '', Email: '', Password: '', ConfirmPassword: '' });

    const handleChange = (field) => (event) => {

        setNewUser({ ...newUser, [field]: event.target.value })
        seterrorMessage("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        seterrorMessage("");
        if (!newUser.FirstName) {
            seterrorMessage('First Name is required.');
            return;
        }
        if (!newUser.LastName) {
            seterrorMessage('Last Name is required.');
            return;
        }
        if (!newUser.Email.trim()) {
            seterrorMessage('Email is required.');
            return;
        }
        if (!newUser.Password) {
            seterrorMessage('Password is required.');
            return;
        }
        if (!newUser.ConfirmPassword) {
            seterrorMessage('ConfirmPassword is required.');
            return;
        }
        if (newUser.Password != newUser.ConfirmPassword) {
            seterrorMessage('Passwords do not match.');
            return;
        }

        console.log(errorMessage);

        try {

            await register(newUser);
            navigate('/login', { replace: true, state: { message: 'Registration successful. Please login.' } });




        } catch (e) {
            const status = e.response?.status;
            if (status === 400) {
                seterrorMessage("Please check the information you entered.");
                return;
            } else if (status === 409) {
                seterrorMessage(
                    "An account with this email already exists."
                );

                return;
            }
            else {
                seterrorMessage(
                    "Something went wrong on the server. Please try again later."
                );

                return;
            }
        }
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100dvh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `url(${loginbackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            overflow: 'hidden'
        }}>
            <Paper elevation={5} sx={{
                width: {
                    xs: "95%", sm: "90%", md: "80%", lg: "70%"
                },
                borderRadius: 3,
                overflow: 'hidden'
            }}>
                <Grid container>
                    <Grid size={{ xs: 0, md: 6 }}>
                        <Box component='img' src={loginbackground2} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}></Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <Box component='form' sx={{ width: 400, p: 3, border: '1px solid', borderColor: colors.grey[200] }} onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 700 }}>User registration</Typography>
                                <Typography variant='caption' sx={{ color: 'text.secondary' }}>Register with email</Typography>
                                <CustomTextField
                                    label="First Name"
                                    value={newUser.FirstName}
                                    onChange={handleChange('FirstName')}

                                />
                                <CustomTextField
                                    label="Last Name"
                                    value={newUser.LastName}
                                    onChange={handleChange('LastName')}
                                />

                                <CustomTextField
                                    label="Email"
                                    value={newUser.Email}
                                    onChange={handleChange('Email')}
                                />

                                <CustomTextField
                                    label="Password"
                                    value={newUser.Password}
                                    autoComplete="new-password"
                                    onChange={handleChange('Password')}
                                />
                                <CustomTextField
                                    label="Confirm Password"
                                    value={newUser.ConfirmPassword}
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={handleChange('ConfirmPassword')}
                                />

                                {errorMessage && (
                                    <Typography variant='body2' sx={{ color: 'error.main' }}>{errorMessage}</Typography>
                                )}

                                <Button type='submit' variant='contained' sx={{ alignSelf: 'flex-end', bgcolor: colors.green[600] }} disabled={registering} >{registering ? 'registering..' : 'register'}</Button>
                                <Divider sx={{ mt: 3, fontSize: 12, color: 'text.secondary' }}>
                                    Or
                                </Divider>

                            </Stack>
                            <Stack direction='row' spacing={2} sx={{ justifyContent: 'center' }}>
                                <Button variant='outlined'><FcGoogle /></Button>
                                <Button variant='outlined'><FaFacebook /></Button>
                                <Button variant='outlined'><FaApple /></Button>
                            </Stack>
                            <Stack direction='row' spacing={0.5} sx={{ mt: 3, justifyContent: 'center', }}>
                                <Typography variant='body1' sx={{ color: "text.secondary", fontSize: '0.85rem' }} >Do you already have an account ?</Typography>
                                <Typography component={Link} to="/login" variant='body1' sx={{ color: 'primary.main', textDecoration: 'none', fontSize: '0.85rem' }}>Sign in</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default RegisterPage
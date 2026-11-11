
import { Box, Paper, Stack, Button, Typography, colors, Grid, Divider, CircularProgress } from '@mui/material'
import { useState } from 'react'
import loginbackground from '@/assets/images/login-back.jpg'
import loginbackground2 from '@/assets/images/login-back2.jpg'
import { Link, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa6';
import CustomTextField from '@/core/components/CustomTextField';
import useAuth from '@/core/hooks/useAuth';






function LoginPage() {

    const { login, loggingIn } = useAuth(null);
    const location = useLocation();
    const message = location.state?.message;


    const [errorMessage, setErrorMessage] = useState("")
    const [newUser, setNewUser] = useState({ Email: '', Password: '', ClientId: 'Client1' });



    const handleSubmit = async (event) => {
        setErrorMessage("");
        event.preventDefault();
        try {
            await login(newUser);
            //navigate("/main/dashboard");//check this navigate()
            /*
             * DO NOT navigate here.
             *
             * GuestRoute will automatically
             * redirect authenticated user
             * to /main/dashboard.
             */
        } catch (error) {
            const status = error.response?.status;
            if (status === 401) {
                setErrorMessage("Invalid email or password.");
            } else if (status === 400) {
                setErrorMessage("Please check the information you entered.");
            } else if (status >= 500) {
                setErrorMessage("Something went wrong on the server. Please try again later.");
            } else {
                setErrorMessage("Unable to login. Please try again.");
            }
            return;
        }
    }
    return (
        <Box sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${loginbackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: "no-repeat",
        }}>
            <Paper elevation={8} sx={{
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
                    <Grid size={{ xs: 12, md: 6 }} sx={{ p: 4, display: 'flex', justifyContent: 'center', background: { xs: 'linear-gradient(45deg, #4E47D5 30%, #BB2879 30%, #EF823A 90%)', md: '#ffffff' } }} >
                        <Box component='form' sx={{ width: 400, p: 3, border: '1px solid', borderColor: colors.grey[200], borderRadius: 2, backgroundColor: 'white' }} onSubmit={handleSubmit}>

                            <Stack sx={{ gap: 2 }}>
                                <Typography variant='h5' sx={{ color: 'primary.main', fontWeight: 700 }}>Wellcome to Softnet</Typography>
                                <Typography variant='caption' sx={{ color: 'text.secondary' }}>Login with email</Typography>

                                <CustomTextField
                                    label="Email"
                                    value={newUser.Email}
                                    onChange={(e) => {
                                        setNewUser({ ...newUser, Email: e.target.value })
                                        setErrorMessage("");
                                    }}
                                />
                                <CustomTextField
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={newUser.Password}
                                    onChange={(e) => {
                                        setNewUser({ ...newUser, Password: e.target.value });
                                        setErrorMessage("");
                                    }}
                                />
                                {errorMessage && (
                                    <Typography variant='body2' color='error'>{errorMessage}</Typography>
                                )}


                                <Typography component={Link} to='forgot' sx={{
                                    alignSelf: 'flex-end',
                                    textDecoration: 'none',
                                    color: "primary.main",
                                    '&:hover': { textDecoration: 'underline' }
                                }}>Forgot password ?</Typography>
                                <Button type='submit' variant='contained' sx={{ bgcolor: 'primary.main' }} >{loggingIn ? <><CircularProgress color='white' size={24} /> <Typography>Login...</Typography></> : "login"}</Button>

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
                                <Typography variant='body1' sx={{ color: "text.secondary", fontSize: '0.85rem' }} >Don't have an account ?</Typography>
                                <Typography component={Link} to="/register" variant='body1' sx={{ color: 'primary.main', textDecoration: 'none', fontSize: '0.85rem' }}>Register Now</Typography>
                            </Stack>
                            {message && (
                                <Typography
                                    variant="body2"
                                    sx={{ color: "success.main" }}
                                >
                                    {message}
                                </Typography>
                            )}

                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    )
}

export default LoginPage
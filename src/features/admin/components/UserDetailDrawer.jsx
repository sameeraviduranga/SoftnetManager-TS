import { Close, Home, Person } from '@mui/icons-material';
import { Avatar, Badge, Box, Chip, Drawer, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { json } from 'zod'
import { da } from 'zod/v4/locales';
import DrawerInfo from './DrawerInfo';
import getaddress from '@/core/utils/getAddress';
import useUserManager from '@/features/admin/hooks/useUserManager'
import { data } from 'react-router-dom';


function UserDetailDrawer({ onClose, userId }) {
    const [data, setData] = useState({
        UserProfile: {},
        UserRoles: []
    });
    const { loading, message, loadUserDetail, } = useUserManager();

    useEffect(() => {
        let isActive = true;
        const fetchUser = async () => {
            if (!userId) return;
            const result = await loadUserDetail(userId);
            if (!result.success) {
                return;
            }

            setData({
                ...result.data,
                UserProfile: result.data.UserProfile ?? {},
                UserRoles: result.data.UserRoles ?? []
            });



        }

        fetchUser();
        return () => {
            isActive = false;
        };
    }, [userId, loadUserDetail]);



    const baseUrl = import.meta.env.VITE_API_IMG_URL;
    const userimage = `${baseUrl}/uploads/profileImages/${data.UserProfile?.ProfileImageUrl || 'cff2e6ab-3478-4932-8c39-98bd73182eda_b1.jpg'}`


    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <IconButton onClick={onClose}
                    size='small'

                    sx={{
                        bgcolor: 'error.main',
                        color: 'error.contrastText',
                        borderRadius: '4px',
                        '&:hover': {
                            bgcolor: 'error.dark'
                        }

                    }}>
                    <Close />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', borderRadius: 4, gap: 2, bgcolor: '#F9F9F9', py: 1, height: '90%' }}>
                <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                    <Badge
                        variant='dot'
                        color={data.UserProfile?.IsActive ? 'success' : 'error'}
                        overlap='circular' anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} >
                        <Avatar
                            src={userimage}
                            alt={data.Email}
                            style={{ width: 100, height: 100 }}
                        />
                    </Badge>
                    <Typography variant='body1'>{data.UserProfile?.Salutation}{data.UserProfile?.FirstName}</Typography>
                    {data.UserProfile?.Designation && <Chip variant='filled' size='small' color='warning' label={data.UserProfile?.Designation} />}

                </Box>
                <Box sx={{ p: 1 }}>
                    <Stack spacing={1} sx={{ p: 2 }}>
                        {/* <DrawerInfo label='First Name' value={data.UserProfile?.FirstName} />
                        <DrawerInfo label='First Name' value={data.UserProfile?.Lastname} /> */}
                        <DrawerInfo label='Full Name' value={data.UserProfile?.FirstName + " " + data.UserProfile?.Lastname} />
                        <DrawerInfo label='NIC' value={data.UserProfile?.Nic} />
                        <DrawerInfo label='Address' value={getaddress(data.UserProfile?.Address?.Line1, data.UserProfile?.Address?.Line2, data.UserProfile?.Address?.Line3)} />
                        <DrawerInfo label='Contact' value={data.UserProfile?.PhoneNumber} />
                        <DrawerInfo label='DOB' value={data.UserProfile?.Dob} />
                    </Stack>
                </Box>
                <Box sx={{ p: 1 }}>
                    <Stack spacing={1} sx={{ p: 2 }}>
                        <DrawerInfo label='Email' value={data.Email} />
                        <DrawerInfo label='Roles' />
                    </Stack>
                    <Stack sx={{ px: 2 }} spacing={1} direction='row'>
                        {data.UserRoles.map((role, index) => (<Chip key={index} label={role.toString()} />))}
                    </Stack>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>

            </Box>
        </Box>
    )
}

export default UserDetailDrawer
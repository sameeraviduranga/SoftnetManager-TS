import BoxHeader from '@/core/components/BoxHeader'
import BoxContainer from '@/core/components/CustomBoxContainer'
import CustomSelect from '@/core/components/CustomSelect'
import CustomTextField from '@/core/components/CustomTextField'
import { Close, Person2, Work } from '@mui/icons-material'
import { Avatar, Box, Icon, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editUserSchema } from '@/features/auth/schemas/editUserSchema'
import useUserLookups from '@/features/auth/hooks/useUserLookups'
import useUserAvailability from '@/features/auth/hooks/useUserAvailability'
import CustomDataPicker from '@/core/components/CustomDataPicker'
import { fromDayjs, toDayjs } from '@/core/utils/dateConverter'
import { FaAddressBook } from 'react-icons/fa6'
import CustomButton from '@/core/components/CustomButton'
import { amber, yellow } from '@mui/material/colors'
import getImageUrl from '@/core/utils/imageUtils'
import { mapUserToFormValues } from '@/features/auth/utils/userProfileMapper'
import useUserManager from '@/features/admin/hooks/useUserManager'
import { createJsonPatch } from '@/features/auth/utils/createJsonPatch'
import { normalizedNic } from '@/features/auth/utils/normalizedNic'
import { mapServerValidationErrors } from '@/features/auth/utils/fieldValidation'
import CustomSnackbar from '@/core/components/CustomSnackbar'

function UserEditDrawer({ onClose, userId }) {
    const { loading, isSubmit, message, loadUser, updateUser, loadUsers } = useUserManager();
    const [user, setUser] = useState(null);
    const [Snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const { salutations, genders, maritialStatus, branches, designations, roles, isloading, error: LookUpError } = useUserLookups();
    const {
        emailStatus,
        nicStatus,
        checkEmail,
        checkNic,
        resetEmailStatus,
        resetNicStatus
    } = useUserAvailability();


    const defaultValues = {
        SalutationID: null,
        GenderID: null,
        MaritialStatusID: null,
        BranchID: null,
        DesignationID: null,
        FirstName: '',
        LastName: '',
        AddressDto: {
            ZoneID: null,
            Line1: '',
            Line2: '',
            Line3: '',
            LocationStatus: null
        },
        PhoneNumber: '',
        Nic: '',
        Dob: null,

    }

    const {
        control,
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
        getValues,
        reset,
        formState: { errors, isSubmitting }

    } = useForm({
        resolver: zodResolver(editUserSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
        reValidateMode: 'onChange'
    });

    // Original user data snapshot
    const originalDataRef = useRef(null);





    useEffect(() => {

        let isActive = true;

        const fetchUserData = async () => {

            if (!userId) return;

            const result = await loadUser(userId);

            if (!isActive) return;

            if (!result.success) {
                return;
            }

            const userData = result.data;

            setUser(userData);

            const formValues = mapUserToFormValues(userData);

            originalDataRef.current = structuredClone(formValues);

            reset(formValues);

        };

        fetchUserData();

        return () => {
            isActive = false;
        };


    }, [userId, loadUser, reset]);






    const handleCloaseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar((prev) => ({ ...prev, open: false }));
    }

    //submit function

    const onSubmitt = async (formData) => {
        const originalData = originalDataRef.current;
        if (!originalData) {
            console.error('Original user data is not available.');
            return;
        }
        console.log(originalData)
        console.log(formData)
        const patchDocument = createJsonPatch(originalData, formData);

        if (!patchDocument || patchDocument.length === 0) {
            console.log('No changes detected.');
            setSnackbar({
                open: true,
                message: "No changes to update",
                severity: 'info'
            })
            return;
        }

        // Generated JSON Patch document එක පෙන්වීම
        // console.log(patchDocument);
        console.log(
            JSON.stringify(patchDocument, null, 2)
        );

        //api request
        const response = await updateUser(userId, patchDocument);
        if (response.success) {

            await loadUsers();

            onclose;

            setSnackbar({
                open: true,
                message: response.message || "User Updated!",
                severity: 'success'
            })
            console.log('updated success');
        }

        if (response?.errorResponse?.Error?.length > 0) {
            mapServerValidationErrors(response.errorResponse, setError);
        }

    }


    if (loading || isloading) {
        return (<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>LOADING...</Box>);
    }


    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                // border: '1px solid green',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
            component='form' onSubmit={handleSubmit(onSubmitt)}>
            <Box
                sx={{
                    display: 'flex',
                    p: 1,
                    flexShrink: 0,
                    //boxShadow: 1,
                    bgcolor: 'whitesmoke',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant='body1' color='#377ee7' sx={{ color: '#377ee7', fontWeight: 'bold' }} >Update User Information</Typography>
                </Box>
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
            {/* User edit form content would go here */}
            <Box sx={{ p: 1, overflowY: 'auto', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        src={getImageUrl("uploads/profileImages", user?.UserProfile?.ProfileImageUrl, "cff2e6ab-3478-4932-8c39-98bd73182eda_b1.jpg")}
                        variant='rounded'
                        slotProps={{
                            img: {
                                style: {
                                    objectFit: 'cover' // Image එක නොකැපී මුළු රූපයම පෙන්වීමට
                                }
                            }
                        }}
                        sx={{ width: 100, height: 100, objectFit: 'fill', my: 1, boxShadow: 1, borderRadius: 2 }}
                    />
                </Box>
                <BoxContainer>
                    <BoxHeader sx={{ borderRadius: 4 }}>
                        <Icon><Person2></Person2></Icon>
                        <Typography sx={{ ml: 1 }} variant='body'>Personal Information</Typography>
                    </BoxHeader>
                    <Stack direction='column' spacing={2} sx={{ p: 2 }}>
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1}>
                            <Controller
                                name="SalutationID"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomSelect
                                        label='Salutation'
                                        items={salutations}
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}

                                    />
                                )}
                            />
                            <Controller
                                name="GenderID"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomSelect
                                        label='Gender'
                                        items={genders}
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}

                                    />
                                )}
                            />
                            <Controller
                                name="MaritialStatusID"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomSelect
                                        label='Marital Status'
                                        items={maritialStatus}
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}

                                    />
                                )}

                            />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1}>
                            <Controller
                                name='FirstName'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        label='First Name'
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='LastName'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        label='Last Name'
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1}>

                            <Controller
                                name='Nic'
                                control={control}
                                render={({ field, fieldState }) => {

                                    const errorMessage = fieldState.error?.message ?? nicStatus.error;
                                    return (
                                        <CustomTextField
                                            label='Nic'
                                            {...field}
                                            error={Boolean(errorMessage)}
                                            helperText={errorMessage}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                resetNicStatus();
                                            }}

                                            onBlur={async () => {//check 
                                                field.onBlur();
                                                const currentNic = normalizedNic(originalDataRef.current?.Nic);// originalDataRef.current?.UserProfileDto?.Nic
                                                const newNic = normalizedNic(field.value);

                                                console.log(currentNic)

                                                if (currentNic === newNic) {
                                                    resetNicStatus();
                                                    //console.log("same nic");
                                                    return;
                                                }

                                                if (!newNic) {
                                                    //console.log("Nic is empty");
                                                    return;
                                                }


                                                await checkNic(field.value);
                                            }}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='Dob'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomDataPicker
                                        label='Date of Birth'
                                        name={field.name}
                                        value={toDayjs(field.value)}
                                        onChange={(value) => field.onChange(fromDayjs(value))}
                                        onBlur={field.onBlur}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                    />
                                )}

                            />
                        </Stack>
                    </Stack>
                </BoxContainer>
                <BoxContainer>
                    <BoxHeader>
                        <Icon><FaAddressBook></FaAddressBook></Icon>
                        <Typography sx={{ ml: 1 }} variant='body'>Contact & Address</Typography>
                    </BoxHeader>
                    <Stack direction='column' spacing={2} sx={{ p: 2 }}>
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1}>
                            <Controller
                                name='AddressDto.Line1'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        label='Address Line 1'
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='AddressDto.Line2'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        label='Address Line 2'
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={1}>
                            <Controller
                                name='AddressDto.Line3'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        label='Address Line 3'
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='PhoneNumber'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        label='Contact Number'
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                name='AddressDto.LocationStatus'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomSelect
                                        label='Location'
                                        items={[{ Id: 1, Name: 'Home' }, { Id: 2, Name: 'Office' }, { Id: 3, Name: 'Branch' }]}
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                    />
                                )}

                            />
                        </Stack>
                    </Stack>
                </BoxContainer>
                {/* Work Information */}

                <BoxContainer>
                    <BoxHeader>
                        <Icon><Work></Work></Icon>
                        <Typography variant='body' sx={{ ml: 1 }}>Work Details</Typography>
                    </BoxHeader>
                    <Box sx={{ p: 1, }}>
                        <Stack spacing={1}>
                            <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', xl: 'row' }} sx={{ flexGrow: 1 }} spacing={1}>
                                <Controller
                                    name='DesignationID'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomSelect
                                            label='Designation'
                                            items={designations}
                                            {...field}
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message ?? ""}
                                        />
                                    )}

                                />
                                <Controller
                                    name='BranchID'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomSelect
                                            label='Branch'
                                            items={branches}
                                            {...field}
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message ?? ""}
                                        />
                                    )}

                                />
                            </Stack>
                        </Stack>
                    </Box>
                </BoxContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
                    <CustomButton type='submit' color={amber[500]}>Update</CustomButton>
                </Box>
            </Box>
            <CustomSnackbar
                sx={{ width: '50%' }}
                horizontal='center'
                vertical='bottom'
                variant='filled'
                open={Snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloaseSnackbar}
                message={Snackbar.message}
            />
        </Box>
    )
}

export default UserEditDrawer
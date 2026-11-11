
import BoxHeader from '@/core/components/BoxHeader'
import BoxContainer from '@/core/components/CustomBoxContainer'
import CustomTextField from '@/core/components/CustomTextField'
import { Image, Person, Person2, PhotoCamera, Security, SecurityOutlined, Visibility, VisibilityOff, Work, WorkHistory } from '@mui/icons-material'
import { Box, colors, Grid, Icon, MenuItem, Stack, Typography, Button, TextField, Avatar, Input, IconButton, CircularProgress, InputAdornment, FormHelperText } from '@mui/material'
import dp from '@/assets/images/user.jpg'
import loginbackground from '@/assets/images/login-back.jpg'
import React, { useState, useEffect } from 'react'
import CustomSelect from '@/core/components/CustomSelect'
import { FaAddressBook } from 'react-icons/fa6'
import CustomButton from '@/core/components/CustomButton'
import CustomDataPicker from '@/core/components/CustomDataPicker'
import useUserLookups from '@/features/auth/hooks/useUserLookups'
import dayjs from 'dayjs'
import { fromDayjs, toDayjs } from '@/core/utils/dateConverter'
import CustomMultiSelect from '@/core/components/CustomMultiSelect'
import useUsers from '../hooks/useUsers'
import buildFormData from '../utils/userFormData'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { createUserScheme } from '@/features/auth/schemas/createUserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import useUserAvailability from '../hooks/useUserAvailability'
import { boolean, input } from 'zod'
import { mapServerValidationErrors } from '@/features/auth/utils/fieldValidation'
import CustomSnackbar from '@/core/components/CustomSnackbar'



function CreateUser() {
    const {
        emailStatus,
        nicStatus,
        checkEmail,
        checkNic,
        resetEmailStatus,
        resetNicStatus
    } = useUserAvailability();
    const defaultValues = {
        UserProfileDto: {
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
            UserPhoto: null,
        },
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Roles: []
    }

    const {
        control,
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
        getValues,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(createUserScheme),

        defaultValues,

        mode: "onTouched",

        reValidateMode: "onChange"
    });

    const { isCreating, isSuccess, createUser, fieldErrors, submitError, responseMessage } = useUsers();
    const { salutations, genders, maritialStatus, branches, designations, roles, isloading, error: LookUpError } = useUserLookups();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVisiblePw, setIsVisiblePw] = useState(false);
    const [isVisbleConfirmPw, setIsVisbleConfirmPw] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [confirmPasswordError, setconfirmPasswordError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    //const [user, setUser] = useState(defaultValues);
    const [Snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });



    const handleCloaseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar((prev) => ({ ...prev, open: false }));
    }



    // const handleFileSelect = (e) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;
    //     setUser((prev) => ({
    //         ...prev,
    //         UserProfileDto: {
    //             ...prev.UserProfileDto,
    //             UserPhoto: file
    //         }
    //     }));
    //     setImagePreview(URL.createObjectURL(file));
    // };

    // const handleInputChange = (path, value) => {
    //     setUser((prev) => updateNestedValue(prev, path, value));
    // }

    // const updateNestedValue = (obj, path, value) => {
    //     const keys = path.split('.');
    //     const result = { ...obj }
    //     let current = result;

    //     for (let i = 0; i < keys.length - 1; i++) {
    //         current[keys[i]] = { ...current[keys[i]] }
    //         current = current[keys[i]];
    //     }

    //     current[keys[keys.length - 1]] = value;

    //     return result;

    // }

    // const clearFormFields = () => {
    //     setconfirmPasswordError('');
    // }
    // Submit form using React Hook Form's handleSubmit

    //onSubmit is userdefined function
    const onSubmit = async (formValues) => {
        // data එකට Zod schema එකෙන් 100ක් වැදගත් විදිහට validate වෙච්ච values ටික ලැබෙනවා
        const { ConfirmPassword, ...userData } = formValues
        const response = await createUser(userData);

        if (response.success) {
            setSnackbar({
                open: true,
                message: responseMessage || "User Created Successfully",
                severity: 'success'
            })
            return;
        }

        const serverResponse = response.error;//this is api response

        if (serverResponse?.Error?.length > 0) {
            mapServerValidationErrors(serverResponse, setError);
        }



    };

    if (isloading) {
        return (
            <Box sx={{ maxWidth: '1000px', minHeight: '400px', mx: 'auto', border: '1px solid #f0eded', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography variant='h6'>Loading...</Typography>
            </Box>
        );

    }
    if (LookUpError) {
        return (
            <Box sx={{ maxWidth: '1000px', minHeight: '400px', mx: 'auto', p: 3, textAlign: 'center', border: '1px solid #f0eded', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography color='error'>{LookUpError}</Typography>
            </Box>
        );

    }
    return (

        <Box sx={{ maxWidth: '1000px', mx: 'auto', border: '1px solid #f0eded', position: 'relative' }} component='form' encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <BoxContainer>
                <BoxHeader>
                    <Icon><Person2></Person2></Icon>
                    <Typography sx={{ ml: 1 }} variant='body'>Personal Information</Typography>
                </BoxHeader>
                <Box sx={{ p: 1 }}>
                    <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}>
                        <Stack direction='column' sx={{ flexGrow: 1, order: { xs: 2, sm: 2, md: 1, lg: 1, xl: 1 } }} spacing={1}>
                            <Stack direction={{ xs: 'column', sm: 'row', lg: 'row', xl: 'row' }} spacing={1}>
                                <Controller
                                    name='UserProfileDto.SalutationID'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomSelect
                                            label='Salutation'
                                            items={salutations}
                                            {...field}
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message ?? ""}
                                        />
                                    )}
                                />
                                <Controller
                                    name='UserProfileDto.GenderID'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomSelect
                                            label='Gender'
                                            items={genders}
                                            {...field}
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message ?? ""}
                                        />
                                    )}
                                />

                                <Controller
                                    name='UserProfileDto.MaritialStatusID'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomSelect
                                            label='Maritail Status'
                                            items={maritialStatus}
                                            {...field}
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message ?? ""}
                                        />
                                    )}

                                />


                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row', lg: 'row', xl: 'row' }} spacing={1}>
                                <Controller
                                    name='UserProfileDto.FirstName'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomTextField
                                            {...field}
                                            label="First Name"
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message ?? ""}
                                        />
                                    )}

                                />
                                <Controller
                                    name='UserProfileDto.LastName'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomTextField
                                            {...field}
                                            label="Last Name"
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message ?? ""}
                                        />
                                    )}
                                />


                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row', lg: 'row', xl: 'row' }} spacing={1}>
                                <Controller
                                    name='UserProfileDto.Nic'
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        const errorMessage = fieldState.error?.message ?? nicStatus.error;
                                        return (
                                            <CustomTextField
                                                {...field}
                                                label="Nic"
                                                error={Boolean(errorMessage)}
                                                helperText={errorMessage}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    resetNicStatus();
                                                }}

                                                onBlur={async (event) => {
                                                    field.onBlur();
                                                    await checkNic(event.target.value);
                                                }}
                                            />
                                        );
                                    }}
                                />

                                <Controller
                                    name='UserProfileDto.Dob'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <CustomDataPicker
                                            label="DOB"
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
                        <Box
                            sx={{

                                maxWidth: { xs: '100%', lg: '150px' },
                                display: 'flex',
                                justifyContent: 'center',
                                order: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
                                p: 1
                            }} >
                            <Stack direction='column' sx={{ ml: 1, position: 'relative' }}>
                                <Controller
                                    name='UserProfileDto.UserPhoto'
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Avatar src={imagePreview} variant='rounded'
                                                slotProps={{
                                                    img: {
                                                        style: {
                                                            objectFit: 'cover' // Image එක නොකැපී මුළු රූපයම පෙන්වීමට
                                                        }
                                                    }
                                                }}
                                                sx={{ width: 130, height: 130, objectFit: 'contain', }}
                                            />
                                            <IconButton
                                                component="label"
                                                sx={{

                                                    position: 'absolute',
                                                    bottom: -6,
                                                    right: -6,
                                                    backgroundColor: 'primary.main',
                                                    color: '#fff',
                                                    boxShadow: 2,
                                                    '&:hover': { backgroundColor: 'primary.dark' },
                                                }}>
                                                <PhotoCamera fontSize='small' />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name={field.name}
                                                    ref={field.ref}
                                                    onBlur={field.onBlur}
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => {
                                                        const file = e.currentTarget.files?.[0];
                                                        if (file) {
                                                            field.onChange(file);
                                                            setImagePreview(URL.createObjectURL(file))
                                                        }
                                                    }}

                                                />
                                            </IconButton>
                                            {fieldState.error && (
                                                <FormHelperText error={Boolean(fieldState.error)}
                                                    sx={{ marginTop: 1, textAlign: 'center' }}>
                                                    {fieldState.error?.message ?? ""}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )}
                                />

                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </BoxContainer >
            <BoxContainer>
                <BoxHeader>
                    <Icon><FaAddressBook></FaAddressBook></Icon>
                    <Typography sx={{ ml: 1 }} variant='body'>Contact & Address</Typography>
                </BoxHeader>
                <Box sx={{ p: 1, }}>
                    <Stack spacing={1}>
                        <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', xl: 'row' }} sx={{ flexGrow: 1 }} spacing={1}>
                            <Controller
                                name='UserProfileDto.AddressDto.Line1'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        {...field}
                                        label="Address Line 1"
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                    />
                                )}
                            />
                            <Controller
                                name='UserProfileDto.AddressDto.Line2'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        {...field}
                                        label="Address Line 2"
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                    />
                                )}
                            />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', xl: 'row' }} sx={{ flexGrow: 1 }} spacing={2}>
                            <Controller
                                name='UserProfileDto.AddressDto.Line3'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        {...field}
                                        label="Address Line 3"
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                    />
                                )}
                            />

                            <Controller
                                name='UserProfileDto.PhoneNumber'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        {...field}
                                        label="Contact"
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                    />
                                )}
                            />
                            <Controller
                                name='UserProfileDto.AddressDto.LocationStatus'
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
                </Box>
            </BoxContainer>
            {/* work */}
            <BoxContainer>
                <BoxHeader>
                    <Icon><Work></Work></Icon>
                    <Typography variant='body' sx={{ ml: 1 }}>Work Details</Typography>
                </BoxHeader>
                <Box sx={{ p: 1, }}>
                    <Stack spacing={1}>
                        <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', xl: 'row' }} sx={{ flexGrow: 1 }} spacing={1}>
                            <Controller
                                name='UserProfileDto.DesignationID'
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
                                name='UserProfileDto.BranchID'
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
            {/* credential */}
            <BoxContainer>
                <BoxHeader>
                    <Icon><SecurityOutlined /></Icon>
                    <Typography variant='body' sx={{ ml: 1 }}>Credentials</Typography>
                </BoxHeader>
                <Box sx={{ p: 1, }}>
                    <Stack spacing={1}>
                        <Stack spacing={1}>
                            <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', xl: 'row' }} sx={{ flexGrow: 1, width: { lg: '50%', xl: '50%' } }} spacing={1}>
                                <Controller
                                    name='Email'
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        var errorMessage = fieldState.error?.message || emailStatus.error;
                                        return (
                                            <CustomTextField
                                                {...field}
                                                label="Email"
                                                error={Boolean(errorMessage)}
                                                helperText={errorMessage}
                                                onChange={async (event) => {
                                                    field.onChange(event);
                                                    resetEmailStatus();

                                                }}
                                                onBlur={async (event) => {
                                                    field.onBlur()
                                                    await checkEmail(event.target.value);
                                                }}
                                                slotProps={{
                                                    input: {
                                                        endAdornment: emailStatus.checking
                                                            ? (
                                                                <CircularProgress size={18} />
                                                            ) : undefined
                                                    }
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', xl: 'row' }} spacing={1}>
                            <Controller
                                name='Password'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        {...field}
                                        label="Password"
                                        type={isVisiblePw ? 'text' : 'password'}

                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setIsVisiblePw(!isVisiblePw)} edge="end">
                                                            {isVisiblePw ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name='ConfirmPassword'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomTextField
                                        {...field}
                                        label="Confirm Password"
                                        type={isVisbleConfirmPw ? 'text' : 'password'}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setIsVisbleConfirmPw(!isVisbleConfirmPw)} edge="end">
                                                            {isVisbleConfirmPw ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }
                                        }}

                                    />
                                )}
                            />


                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', xl: 'row' }} spacing={1}>
                            <Controller
                                name='Roles'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <CustomMultiSelect
                                        label='Roles'
                                        items={roles}
                                        value={field.value ?? []}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        error={Boolean(fieldState.error)}
                                        helperText={fieldState.error?.message ?? ""}
                                    />
                                )}
                            />

                        </Stack>
                    </Stack>
                </Box>
            </BoxContainer>
            {submitError && (
                <Typography color="error" sx={{ p: 1 }}>{submitError}</Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mr: 1, p: 1 }}>
                {isCreating ? (
                    <CustomButton type='submit'>
                        <CircularProgress />
                        submitting..
                    </CustomButton>
                ) : (
                    <CustomButton type='submit'>Submit</CustomButton>
                )}
                <CustomButton color='error'>Cancel</CustomButton>

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
        </Box >
    )
}

export default CreateUser
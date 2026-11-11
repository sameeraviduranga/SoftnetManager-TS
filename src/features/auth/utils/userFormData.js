const buildFormData = (user) => {
    const formData = new FormData();
    //personal information
    // formData.append('UserProfileDto.SalutationID', user.UserProfileDto.SalutationID ?? 0);
    // formData.append('UserProfileDto.GenderID', user.UserProfileDto.GenderID ?? 0);
    // formData.append('UserProfileDto.MaritialStatusID', user.UserProfileDto.MaritialStatusID);

    appendIfNotNull(formData, 'UserProfileDto.SalutationID', user.UserProfileDto.SalutationID);
    appendIfNotNull(formData, 'UserProfileDto.GenderID', user.UserProfileDto.GenderID);
    appendIfNotNull(formData, 'UserProfileDto.MaritialStatusID', user.UserProfileDto.MaritialStatusID);

    formData.append('UserProfileDto.FirstName', user.UserProfileDto.FirstName ?? '');
    formData.append('UserProfileDto.LastName', user.UserProfileDto.LastName ?? '');
    formData.append('UserProfileDto.Nic', user.UserProfileDto.Nic ?? '');




    if (user.UserProfileDto.Dob) {
        formData.append('UserProfileDto.Dob', user.UserProfileDto.Dob);
    }

    if (user.UserProfileDto.UserPhoto) {
        formData.append('UserProfileDto.UserPhoto', user.UserProfileDto.UserPhoto);
    }


    //contact and address details


    appendIfNotNull(formData, 'UserProfileDto.AddressDto.ZoneID', user.UserProfileDto.AddressDto.ZoneID);
    formData.append('UserProfileDto.AddressDto.Line1', user.UserProfileDto.AddressDto.Line1);
    formData.append('UserProfileDto.AddressDto.Line2', user.UserProfileDto.AddressDto.Line2);
    formData.append('UserProfileDto.AddressDto.Line3', user.UserProfileDto.AddressDto.Line3);
    appendIfNotNull(formData, 'UserProfileDto.AddressDto.LocationStatus', user.UserProfileDto.AddressDto.LocationStatus);
    //formData.append('UserProfileDto.AddressDto.LocationStatus', user.UserProfileDto.AddressDto.LocationStatus ?? 0);
    formData.append('UserProfileDto.PhoneNumber', user.UserProfileDto.PhoneNumber);

    //work details
    appendIfNotNull(formData, 'UserProfileDto.BranchID', user.UserProfileDto.BranchID);
    appendIfNotNull(formData, 'UserProfileDto.DesignationID', user.UserProfileDto.DesignationID);

    // formData.append('UserProfileDto.BranchID', user.UserProfileDto.BranchID);
    // formData.append('UserProfileDto.DesignationID', user.UserProfileDto.DesignationID);
    //credentials
    formData.append('Email', user.Email);
    formData.append('Password', user.Password);

    //roles
    user.Roles.forEach((roleId) => {
        formData.append('Roles', roleId);
    })

    //for testing purpose
    // for (let [key, value] of formData.entries()) {
    //     console.log(`${key}:`, value);
    // }

    return formData;
}

const appendIfNotNull = (formdata, key, value) => {

    if (value == null) {
        return;
    }
    // if (value !== null || value !== undefined || value !== '') {
    //     formdata.append(key, value);
    // }
    formdata.append(key, value);
}

export default buildFormData;

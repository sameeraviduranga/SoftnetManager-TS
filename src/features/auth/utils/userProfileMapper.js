export const mapUserToFormValues = (data) => {
    const userProfile = data?.UserProfile || {};
    return {

        SalutationID: userProfile.SalutationID || null,
        GenderID: userProfile.GenderID || null,
        MaritialStatusID: userProfile.MaritialStatusID || null,
        BranchID: userProfile.BranchID || null,
        DesignationID: userProfile.DesignationID || null,
        FirstName: userProfile.FirstName || '',
        LastName: userProfile.LastName || '',
        AddressDto: {
            ZoneID: userProfile.Address?.ZoneID || null,
            Line1: userProfile.Address?.Line1 || '',
            Line2: userProfile.Address?.Line2 || '',
            Line3: userProfile.Address?.Line3 || '',
            LocationStatus: userProfile.Address?.LocationStatus || null
        },
        PhoneNumber: userProfile.PhoneNumber || '',
        Nic: userProfile.Nic || '',
        Dob: userProfile.Dob || null,

    }
}


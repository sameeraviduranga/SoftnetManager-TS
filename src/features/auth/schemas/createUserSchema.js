import { number, z } from 'zod'

const requiredText = (label) => {
    return z.string()
        .trim()
        .min(1, `${label} is required`);
}

const requiredId = (label) => {
    return z.preprocess(
        (value) =>
            value === "" || value === null || value === undefined
                ? undefined
                : Number(value),
        z.number({
            error: `${label} is required.`
        })
            .int(`${label} is invalid.`)
            .positive(`${label} is required.`)
    );
}

const requiredDate = z.union([
    z.string().min(1, "Date of birth is required."),
    z.date()
])
    .nullable()

    .refine(
        (value) => value !== null && value !== "",
        "Date of birth is required."
    )

export const createUserScheme = z.object({
    UserProfileDto: z.object({
        SalutationID: requiredId("Salutation"),
        GenderID: requiredId("Gender"),
        MaritialStatusID: requiredId("Marital status"),
        BranchID: requiredId("Branch"),
        DesignationID: requiredId("Designation"),
        FirstName: requiredText("First Name"),
        LastName: requiredText("Last Name"),
        AddressDto: z.object({
            ZoneID: z.preprocess(
                (value) => value === "" || value === undefined || value === null ? null : Number(value),
                z.number().positive().nullable()
            ),
            Line1: requiredText("Address Line 1"),
            Line2: requiredText("Address Line 2"),
            Line3: z.string(),
            LocationStatus: requiredId("Location status")

        }),
        PhoneNumber: requiredText("Phone number"),
        Nic: requiredText("NIC"),
        Dob: requiredDate,
        UserPhoto: z.any().nullable()

    }),
    Email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .pipe(
            z.email("Enter a valid email address.")
        ),
    Password: z
        .string()
        .min(8, "Password must contain at least 8 characters."),
    ConfirmPassword: z
        .string()
        .min(8, "Confirm Password is required."),
    Roles: z
        .array(z.union([z.string(), z.number()]))
        .min(1, "Select at least one role.")
})
    .refine(
        (data) => data.Password === data.ConfirmPassword,
        {
            path: ["ConfirmPassword"],
            message: "Password and Confirm Password do not match."
        }
    );
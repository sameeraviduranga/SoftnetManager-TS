//validation errros
//old method
// export const extractValidationErrors = (response) => {
//     console.log(response.Error);
//     const errors = {};
//     var validationErros = response?.Error?.Errors ?? [];
//     validationErros.forEach((error) => {
//         if (!errors[error.Property]) {
//             errors[error.Property] = error.Error;
//         }
//     });

//     return errors;
// }

export const mapServerValidationErrors = (response, setError) => {
    var validationErrors = response?.Error ?? [];
    validationErrors.forEach((error) => {
        if (!error?.Property || !error?.Error) {
            return;
        }

        setError(error.Property, {
            type: 'server',
            message: error.Error
        });
    });
}
import validator from "validator";

const validate = inputs => {

    const errorTexts = {};

    if (validator.isEmpty(inputs.name)) {
        errorTexts.name = "Name is required"
    } else if (!validator.isLength(inputs.name, 4)) {
       errorTexts.name = "Please enter a valid name"
    };

    if (validator.isEmpty(inputs.email)) {
        errorTexts.email = "Email address is required"
    } else if (!validator.isEmail(inputs.email)) {
        errorTexts.email = "Please enter a valid email address"
    };

    return errorTexts;
};

export default validate;
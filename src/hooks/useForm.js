import React from "react";
import validate from "../validators";


const useForm = callback => {
    const initialInputValues = {
        "name": "",
        "email": "",
        "type": "",
        "target": ""
    };
    const [inputs, setInputs] = React.useState(initialInputValues);
    const [errors, setErrors] = React.useState({});
    const [isValidating, setValidating] = React.useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        setErrors(Object.assign({}, validate(inputs)));
        setValidating(true);
    };

    const handleFormReset = e => {
        e.preventDefault();
        setInputs(Object.assign({}, initialInputValues));
        setErrors(Object.assign({}, {}));
    };

    React.useEffect(() => {
        if (Object.entries(errors).length === 0 && isValidating) {
            callback();
        };
    });

    return { 
        inputs, 
        setInputs, 
        handleInputChange, 
        handleFormReset, 
        handleFormSubmit,
        errors
    };
};

export default useForm;

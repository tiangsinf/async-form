import React from "react";
import validate from "../validators";

import Core from "../api/core.json";
import Electives from "../api/electives.json";

const Courses = {
    core: Core,
    electives: Electives
};

const useForm = callback => {
    const initialInputValues = {
        "name": "",
        "email": "",
        "department": "",
        "course": ""
    };

    const [inputs, setInputs] = React.useState(initialInputValues);
    const [courses, setCourses] = React.useState([]);
    const [_loading, setLoading] = React.useState(false);

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

    // If user selected department, fetch courses based on selected dept.
    React.useEffect(() => {

        if (inputs.department) fetch(inputs.department)
        // eslint-disable-next-line
    }, [_loading, inputs.department]);

    const fetch = department => {
        setLoading(true);
        apiClient(department).then(courses => {
            setCourses([...courses]);
        });
        setLoading(false);
    };

    function apiClient(department) {
        return {
            then: function(cb) {
                setTimeout(() => {
                    cb(Courses[department]);
                }, 1000);
            }
        };
    }


    return { 
        inputs, 
        setInputs, 
        handleInputChange, 
        handleFormReset, 
        handleFormSubmit,
        errors,
        courses,
        _loading
    };
};

export default useForm;

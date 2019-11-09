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
    const [submitDisabled, setSubmitDisabled] = React.useState(true);
    const [courseDisabled, setCourseDisabled] = React.useState(true);

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

    const fetch = department => {
        apiClient(department).then(courses => {
            setCourses([...courses]);
        });
    };

    function apiClient(department) {
        return {
            then: function(cb) {
                setTimeout(() => {
                    cb(Courses[department]);
                }, 500);
            },
        };
    };

    React.useEffect(() => {
        setSubmitDisabled(true);
        if (inputs.name.length >= 3 && inputs.email.length >= 3) {
            setSubmitDisabled(false);
        };
        // eslint-disable-next-line
    }, [inputs.name, inputs.email]);

    React.useEffect(() => {
        setCourseDisabled(true);
        setInputs(Object.assign({}, inputs, { "course": "" }))
        if (inputs.department) {
            setCourseDisabled(false);
        };
        if (!inputs.department || _loading) {
            setCourseDisabled(true);
        };
        if (inputs.department) {
            setLoading(true)
            fetch(inputs.department);
        };
        // eslint-disable-next-line
    }, [inputs.department, _loading])

    React.useEffect(() => {
        if (courses.length) {
            setLoading(false)
        };
        // eslint-disable-next-line
    }, [courses]);

    return { 
        inputs, 
        setInputs, 
        handleInputChange, 
        handleFormReset, 
        handleFormSubmit,
        errors,
        courses,
        _loading,
        submitDisabled,
        courseDisabled
    };
};

export default useForm;

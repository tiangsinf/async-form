import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from "@material-ui/core";
import useStyles from "../hooks/useStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

import useForm from "../hooks/useForm"
import Core from "../api/core.json";
import Electives from "../api/electives.json";

const Courses = {
    core: Core,
    electives: Electives
};

function CourseSelect({ department, course }) {
    const classes = useStyles();

    const { handleInputChange, inputs, _loading } = useForm();

    // render and select department
    const onSelectDepartment = e => {
        const department = e.target.value;
        console.log(courseSelect.department);
        setCourseSelect({...courseSelect, department });
        // department.onChange({ name: "department", value: department });
        // course.onChange({ name: "course", value: course });
        if (department) fetch(department);
    };

    const fetch = department => {
        setCourseSelect(Object.assign({}, courseSelect, {
            _loading: true,
            courses: []
        }));
        apiClient(department).then(courses => {
            setCourseSelect(Object.assign({}, courseSelect, {
                courses: courses
            }));
        });
    };

    function apiClient(department) {
        return {
            then: function(callback) {
                setTimeout(() => {
                    callback(Courses[department]);
                }, 1000);
            }
        };
    };

    const onSelectCourse = e => {
        const course = e.target.value;
        setCourseSelect(Object.assign({}, courseSelect, { course }))

        course.onChange({ name: "course", value: course });
    };

    const { handleInputChange } = useForm();

    const renderDepartmentSelect = () => {
        return (
            <FormControl className={classes.input}>
                <InputLabel>Department</InputLabel>
                <Select 
                    onChange={console.log(e => e.target.value)} 
                    value={inputs.department}
                >
                    <MenuItem value={""}>Which department?</MenuItem>
                    <MenuItem value={1}>NodeSchool: Core</MenuItem>
                    <MenuItem value={"electives"}>NodeSchool: Electives</MenuItem>
                </Select>
            </FormControl>
        )
    };

    const renderCourseSelect = () => {
        if (_loading) {
            return <CircularProgress />
        };
        if (!inputs.department || !inputs.courses.length) {
            return <span />
        };
        return (
            <FormControl className={classes.input}>
                <InputLabel>Course</InputLabel>
                <Select
                    onChange={handleInputChange}
                    value={inputs.course || ""}
                >
                    {[
                        <MenuItem value="" key="course-none">
                            Which course?
                        </MenuItem>,

                        ...inputs.courses.map((course, i) => (
                            <MenuItem value={course} key={i}>{course}</MenuItem>
                        ))
                    ]}
                </Select>
            </FormControl>
        )
    };

    return (
        <>
            {renderDepartmentSelect()}
            {renderCourseSelect()}
        </>
    );
};

export default CourseSelect;
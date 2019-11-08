import React from "react";
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from "@material-ui/core";
import useStyles from "../hooks/useStyles";

import

function CourseSelect() {

    const [courseSelect, setCourseSelect] = React.useState({
        department: null,
        course: null,
        courses: [],
        _loading: false
    });

    // render and select department
    const handleDepartmentSelect = e => {
        const department = e.target.value;
        const course = null;
        
        setCourseSelect(Object.assign({}, courseSelect, {
            department,
            course
        }));
        props.onChange({ name: "department", value: department });
        props.onChange({ name: "course", value: course });

        if (department) fetch(department);
    };

    const fetch = department => {
        setCourseSelect(Object.assign({}, courseSelect, {
            _loading: true,
            course: []
        }));
    }

    const renderDepartmentSelect = () => {
        return (
            <FormControl className={classes.input}>
                <InputLabel>Type</InputLabel>
                <Select onChange={handleDepartmentSelect}>
                    {departments.map(department => {
                        return (
                            <MenuItem key={department.id} value={department.id}>
                                {department.id} - {department.name}
                            </MenuItem>
                        )
                    })}
                </Select>
                <CourseSelect update={selectedDepartment} />
            </FormControl>
        )
    };

    const classes = useStyles(handleDepartmentSelect);
    return (
        <>
            {renderDepartmentSelect()}
            {renderCourseSelect()}
        </>
    );
};

CourseSelect.propTypes = {
    department: PropTypes.string,
    course: PropTypes.string,
    handleDepartmentSelect: PropTypes.func.isRequired
};

export default CourseSelect;
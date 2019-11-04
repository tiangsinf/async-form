import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from "@material-ui/core";
import useStyles from "../hooks/useStyles";

function DepartmentSelect() {

    const [departments, setDepartment] = React.useState([
        { id: "SC", name: "Science" },
        { id: "BU", name: "Business" }
    ]);

    const [selectedDepartment, setSelectedDepartment] = React.useState("");

    const handleDepartmentSelect = e => {
        setSelectedDepartment(e.target.value);
    };

    const classes = useStyles(handleDepartmentSelect);
    return (
        <>
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
        </>
    );
};

function CourseSelect(update) {
    const initialState = {
        department: null,
        course: null,
        courses: [],
        _loading: false
    };
    const [courseSelect, setCourseSelect] = React.useState(initialState)

    // const getDerivedStateFromProps = update => {
    //     return {
    //         department: update.department,
    //         course: update.course
    //     };
    // };


    const classes = useStyles();
    return (
        <>
            {/* <div>
            {renderDepartmentSelect()}
            <br />
            {renderCourseSelect()}
        </div> */}
            <FormControl className={classes.input}>
                <InputLabel>Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled
                >

                </Select>
            </FormControl>
        </>
    );
}

export default DepartmentSelect;
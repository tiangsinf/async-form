import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from "@material-ui/core/Divider";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from "@material-ui/core";
import useStyles from "../hooks/useStyles";
import CircularProgress from '@material-ui/core/CircularProgress';

import useForm from "../hooks/useForm"

export default function App() {
    const classes = useStyles();

    const {
        inputs,
        handleInputChange,
        handleFormReset,
        handleFormSubmit,
        errors,
        courses,
        _loading,
        submitDisabled,
        courseDisabled
    } = useForm(isSubmitted);

    function isSubmitted() {
        console.log(`name: ${inputs.name}, email: ${inputs.email}`);
    };

    const renderSelectDepartment = () => {
        return (
            <FormControl className={classes.input}>
                <InputLabel>Department</InputLabel>
                <Select
                    name="department"
                    onChange={handleInputChange} 
                    value={inputs.department}
                    
                >
                    <MenuItem value="">Which department?</MenuItem>
                    <MenuItem value="core">NodeSchool: Core</MenuItem>
                    <MenuItem value="electives">NodeSchool: Electives</MenuItem>
                </Select>
            </FormControl>
        )
    };

    const renderSelectCourse = () => {
        return (
            <FormControl className={classes.input} disabled={courseDisabled}>
                <InputLabel>
                    Course&nbsp;&nbsp;
                    {_loading ? <CircularProgress 
                        size={14} 
                        thickness={8}
                        className={classes.buttonProgress}
                    /> : null}
                </InputLabel>
                <Select
                    name="course"
                    onChange={handleInputChange}
                    value={inputs.course || ""}

                >
                    {[
                        <MenuItem value="" key="course-none">
                            Which course?
                        </MenuItem>,

                        ...courses.map((course, i) => (
                            <MenuItem value={course} key={i}>{course}</MenuItem>
                        ))
                    ]}
                    
                </Select>
            </FormControl>
        )
    };

    React.useEffect(() => {
        console.log(inputs);
    });

    return (
        <div>
            <Dialog open={true} fullWidth>
                <DialogTitle id="form-dialog-title">Async Form</DialogTitle>
                <Divider />
                <form onSubmit={handleFormSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            error={errors.name ? true : false}
                            className={classes.input}
                            name="name"
                            label="Name"
                            value={inputs.name}
                            helperText={errors.name ? errors.name : null}
                            onChange={handleInputChange}
                        />
                        <TextField
                            error={errors.email ? true : false}
                            className={classes.input}
                            name="email"
                            label="Email Address"
                            value={inputs.email}
                            helperText={errors.email ? errors.email : null}
                            onChange={handleInputChange}
                        />
                        {renderSelectDepartment()}
                        {renderSelectCourse()}
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" disabled={submitDisabled}>
                            Submit
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleFormReset}
                        >
                            Reset
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
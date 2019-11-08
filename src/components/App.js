import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from "@material-ui/core/Divider";

import useForm from "../hooks/useForm";
import useStyles from "../hooks/useStyles";
import CourseSelect from "./CourseSelect";

export default function App() {
    const classes = useStyles();

    const [isDisabled, setIsDisabled] = React.useState(true);

    const {
        inputs,
        handleInputChange,
        handleFormReset,
        handleFormSubmit,
        errors
    } = useForm(isSubmitted);

    function isSubmitted() {
        console.log(`name: ${inputs.name}, email: ${inputs.email}`);
    };

    // mimic only cDU without cDM:
    const mounted = React.useRef();
    React.useEffect(() => {
        // bypass first mount
        if (!mounted.current) {
            mounted.current = true;

            // cDU logic
        } else if (inputs.name.length >= 3 && inputs.email.length >= 3) {
            setIsDisabled(false);
        }
    }, [inputs]);

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
                            inputRef={mounted}
                        />
                        <TextField
                            error={errors.email ? true : false}
                            className={classes.input}
                            name="email"
                            label="Email Address"
                            value={inputs.email}
                            helperText={errors.email ? errors.email : null}
                            onChange={handleInputChange}
                            inputRef={mounted}
                        />
                        <CourseSelect />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" disabled={isDisabled}>
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
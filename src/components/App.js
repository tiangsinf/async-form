import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from "@material-ui/core/Divider";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import useForm from "./hooks/useForm";

const useStyles = makeStyles(theme => ({
        input: {
            display: "flex",
            marginBottom: theme.spacing(1)
        }
    }));

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
                        <FormControl className={classes.input}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.input}>
                            <InputLabel>Target</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                disabled
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
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
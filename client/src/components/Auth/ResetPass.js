import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

import { updatePass } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./Input";

const initialState = { password: "", confirmPassword: "" };

const ResetPass = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const error = useSelector((state) => state.auth.errors);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const handleShowConfirmPassword = () => setConfirmShowPassword(!showConfirmPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePass({ ...form, id: user.result._id }, history));
        // console.log({ ...form, _id: user.result._id });
        // dispatch(signin(form, history));
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                {error && <Alert severity="error">{error}</Alert>}
                <Typography component="h1" variant="h5">
                    Please change your password before proceeding!
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        <Input
                            name="confirmPassword"
                            label="Repeat Password"
                            handleChange={handleChange}
                            type={showConfirmPassword ? "text" : "password"}
                            handleShowPassword={handleShowConfirmPassword}
                        />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Change Password
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ResetPass;

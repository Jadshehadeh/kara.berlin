// import axios from "axios";
import React, { useState } from "react";
import { createUser } from "../auth/index";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

export default function CreateUser() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    error: "",
    role: "",
    success: false,
  });

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    role,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    createUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
    }).then((data) => {
      if (data.message) {
        setValues({ ...values, error: data.message, success: false });
      } else {
        setValues({
          ...values,
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const showError = () => (
    <Alert
      variant="filled"
      severity="error"
      style={{ marginTop: "15px", display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <Alert
      variant="filled"
      severity="success"
      style={{ display: success ? "" : "none" }}
    >
      Account has been created successfully!
    </Alert>
  );

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "15px",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const admin = (
    <span>
      Once Role is set to{" "}
      <span
        style={{
          color: "red",
          letterSpacing: 1,
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        ADMIN
      </span>{" "}
      you cant change or delete it!!!
    </span>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>
        {showError()}
        {showSuccess()}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            // helperText={error.message}
            required
            fullWidth
            name="firstName"
            label="Firstname"
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            name="lastName"
            label="Lastname"
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleChange("lastName")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChange("phoneNumber")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleChange("email")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handleChange("password")}
          />
          <TextField
            id="outlined-select-currency"
            style={{ marginTop: 15 }}
            error={error}
            select
            required
            fullWidth
            label="Role"
            value={role}
            onChange={handleChange("role")}
            helperText={admin}
            variant="outlined"
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
            ))
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={clickSubmit}
            className={classes.submit}
          >
            <Typography component="h1">Create User</Typography>
          </Button>
        </form>
      </div>
    </Container>
  );
}

import React, { useState } from "react";
import { createTicket } from "../api/posts";
import FileUpload from "../fileupload/FileUpload";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";

export default function CreateTicket() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    role: "",
    error: "",
    success: false,
  });

  const { title, description, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    createTicket({
      title,
      description,
    }).then((res) => {
      if (res.message) {
        setValues({
          ...values,
          error: res.message,
          success: false,
        });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
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
      style={{ display: error ? "" : "none" }}
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
      Ticket has been created successfully!
    </Alert>
  );

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DescriptionIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Ticket
        </Typography>
        {showSuccess()}
        {showError()}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            name="title"
            label="Title"
            type="text"
            id="title"
            value={title}
            onChange={handleChange("title")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            height={{ height: "250px" }}
            name="description"
            label="Description"
            type="text"
            id="description"
            value={description}
            onChange={handleChange("description")}
          />

          <div style={{ marginTop: 15, marginBottom: -60 }}>
            <FileUpload />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={clickSubmit}
            className={classes.submit}
          >
            <Typography style={{ fontWeight: "200" }}>Create Ticket</Typography>
          </Button>
        </form>
      </div>
    </Container>
  );
}

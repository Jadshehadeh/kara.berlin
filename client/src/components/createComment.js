import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createComment } from "../api/posts";
import { createFile } from "../api/files";
import { isAuthenticated } from "../auth/index";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";

export default function CreateComment() {
  const [files, setFiles] = useState("");
  const [filename, setFilename] = useState("Choose Files");
  const [values, setValues] = useState({
    text: "",
    error: "",
    role: "",
    category: "",
    year: "",
    success: false,
  });

  const { text, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  let { id } = useParams();

  const onChange = (e) => {
    setFiles(e.target.files);
    setFilename(e.target.files[0].name);
  };

  const user = isAuthenticated().firstName + "_" + isAuthenticated().lastName;
  const userId = isAuthenticated()._id;

  const year = values.year;
  const category = values.category;

  const clickSubmit = async (event) => {
    event.preventDefault();
    if (!files) {
      createComment({
        text,
        id,
      }).then((data) => {
        if (data.message) {
          setValues({ ...values, error: data.message, success: false });
        } else {
          setValues({
            ...values,
            text: "",
            error: "",
            success: true,
          });
        }
      });
    } else {
      const formData = new FormData();
      for (const key of Object.keys(files)) {
        formData.append("files", files[key]);
      }
      formData.append("user", user);
      formData.append("userId", userId);
      formData.append("year", year);
      formData.append("category", category);

      createFile({ formData, text, id });
    }
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
      Comment has been created successfully!
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
      width: "100%", // Fix IE 11 issue.
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
        <Typography component="h1" variant="h5">
          Create Comment
        </Typography>
        {showError()}
        {showSuccess()}
        <form className={classes.form} noValidate encType="multipart/form-data">
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            name="text"
            label="Comment"
            type="text"
            id="text"
            value={text}
            onChange={handleChange("text")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            error={error}
            required
            fullWidth
            name="text"
            label="Year"
            type="number"
            id="year"
            value={year}
            onChange={handleChange("year")}
          />
          <TextField
            id="outlined-select-currency"
            style={{ marginTop: 15 }}
            error={error}
            select
            required
            fullWidth
            label="Category"
            value={category}
            onChange={handleChange("category")}
            variant="outlined"
          >
            <MenuItem value={"type1"}>Tax</MenuItem>
            <MenuItem value={"type2"}>tax2</MenuItem>
            ))
          </TextField>

          <div style={{ marginTop: 25 }} className="custom-file ">
            <input
              type="file"
              multiple
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>

          <Button
            // style={{ marginTop: -5 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={clickSubmit}
            className={classes.submit}
          >
            <Typography style={{ fontWeight: "200" }}>
              Create Comment
            </Typography>
          </Button>
        </form>
      </div>
      {/* <FileUpload /> */}
    </Container>
  );
}

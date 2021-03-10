// // import axios from "axios";
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { createComment } from "../api/posts";
// import { createFile } from "../api/files";

// // import FileUpload from "../fileupload/FileUpload";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import Alert from "@material-ui/lab/Alert";

// export default function CreateComment() {
//   const [file, setFile] = useState("");
//   const [filename, setFilename] = useState("Choose File");
//   const [values, setValues] = useState({
//     text: "",
//     error: "",
//     role: "",
//     success: false,
//   });

//   const { text, error, success } = values;

//   const handleChange = (name) => (event) => {
//     setValues({ ...values, error: false, [name]: event.target.value });
//   };
//   let { id } = useParams();
//   const clickSubmit = (event) => {
//     event.preventDefault();
//     createComment({
//       text,
//       id,
//     }).then((data) => {
//       if (data.message) {
//         setValues({ ...values, error: data.message, success: false });
//       } else {
//         setValues({
//           ...values,
//           text: "",
//           error: "",
//           success: true,
//         });
//       }
//     });
//   };

//   const showError = () => (
//     <Alert
//       variant="filled"
//       severity="error"
//       style={{ marginTop: "15px", display: error ? "" : "none" }}
//     >
//       {error}
//     </Alert>
//   );

//   const showSuccess = () => (
//     <Alert
//       variant="filled"
//       severity="success"
//       style={{ display: success ? "" : "none" }}
//     >
//       Comment has been created successfully!
//     </Alert>
//   );

//   const useStyles = makeStyles((theme) => ({
//     paper: {
//       marginTop: theme.spacing(1),
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//       width: "100%", // Fix IE 11 issue.
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//   }));

//   const classes = useStyles();

//   const onChange = (e) => {
//     setFile(e.target.files[0]);
//     setFilename(e.target.files[0].name);
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Typography component="h1" variant="h5">
//           Create Comment
//         </Typography>
//         {showError()}
//         {showSuccess()}
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="text"
//             label="Comment"
//             type="text"
//             id="text"
//             value={text}
//             onChange={handleChange("text")}
//           />
//           <form className="custom-file mb-4">
//             <input
//               type="file"
//               multiple="multiple"
//               className="custom-file-input"
//               id="customFile"
//               onChange={onChange}
//             />
//             <label className="custom-file-label" htmlFor="customFile">
//               {filename}
//             </label>
//           </form>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={clickSubmit}
//             className={classes.submit}
//           >
//             <Typography style={{ fontWeight: "200" }}>
//               Create Comment
//             </Typography>
//           </Button>
//         </form>
//       </div>
//       {/* <FileUpload /> */}
//     </Container>
//   );
// }

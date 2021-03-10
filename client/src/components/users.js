import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { getUsers, deleteUser, updateUser } from "../api/users";
import CreateUser from "./createUser";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "15px",
  },
}));

export default function UsersTabel() {
  const [users, setUsers] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUsers().then((result) => setUsers(result.data));
  }, []);

  return (
    <>
      <Layout title="Users Page" description="Manage all the users" />
      <Container className="mt-5">
        <div className="mt-5">
          <div>
            <Button
              style={{ marginBottom: 30, fontSize: 16, fontWeight: 600 }}
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              ADD USER
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <CreateUser />
                </div>
              </Fade>
            </Modal>
          </div>
          <MaterialTable
            title="Users Table"
            columns={[
              // { title: "Id", field: "id", editable: "never" },
              { title: "First Name", field: "firstName" },
              { title: "Last Name", field: "lastName" },
              { title: "Email", field: "email", editable: "never" },
              { title: "Phone Number", field: "phoneNumber" },
              {
                title: "Role",
                field: "role",
                lookup: { Admin: "Admin", User: "User" },
              },
            ]}
            data={users}
            editable={{
              isEditHidden: (rowData) => rowData.role === "Admin",
              isDeleteHidden: (rowData) => rowData.role === "Admin",
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...users];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setUsers([...dataUpdate]);

                    resolve(updateUser(newData));
                  }, 100);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...users];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setUsers([...dataDelete]);

                    resolve(deleteUser(oldData));
                  }, 500);
                }),
            }}
            actions={[
              (users) => ({
                icon: () => (
                  <Link to={`/profile/${users._id}`}>
                    <CallMadeIcon />
                  </Link>
                ),
                tooltip: `Go to (${users.firstName}  ${users.lastName})`,
              }),
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </div>
      </Container>
    </>
  );
}

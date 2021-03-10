import React, { useState, useEffect } from "react";
import CreateTicket from "../components/createTicket";
import { getAllPostsForUserId } from "../api/posts";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import CachedIcon from "@material-ui/icons/Cached";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MaterialTable from "material-table";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import CallMadeIcon from "@material-ui/icons/CallMade";

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
  root: {
    flexGrow: 1,
  },
}));

export default function UserDashboard() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const id = isAuthenticated()._id;
  useEffect(() => {
    getAllPostsForUserId(id).then((result) => setPosts(result.data));
  }, [id]);

  const postdata = posts.map((post) => ({
    id: post._id,
    name: post.userId.firstName + "  " + post.userId.lastName,
    title: post.title,
    description: post.description,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    userId: post.userId._id,
    status: post.status,
  }));

  return (
    <>
      <Layout title="User Dashboard" />
      <Container>
        <div>
          <Button
            style={{
              marginBottom: 25,
              marginTop: 25,
              fontSize: 16,
              fontWeight: 600,
            }}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Create Ticket
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
                <CreateTicket />
              </div>
            </Fade>
          </Modal>
        </div>
        <MaterialTable
          title="Tickets Table"
          data={postdata}
          columns={[
            // { title: "Id", field: "id" },
            // {
            //   title: "Owner",
            //   field: "name",
            //   render: (row) => (
            //     <div
            //       style={{
            //         backgroundColor: "#324191",
            //         borderRadius: "15px",
            //         padding: "5px",
            //         textAlign: "center",
            //         verticalAlign: "middle",
            //         color: "white",
            //       }}
            //     >
            //       {row["name"]}
            //     </div>
            //   ),
            //   editable: "never",
            // },
            { title: "Title", field: "title", editable: "never" },
            { title: "Description", field: "description", editable: "never" },
            {
              title: "Status",
              field: "status",
              lookup: {
                0: "Pending",
                1: "In-Progress",
                2: "Completed",
                3: "Rejected",
              },
              render: (row) => (
                <span>
                  {row["status"] === "0" && (
                    <div
                      style={{
                        border: "1px solid",
                        borderColor: "#cc8500",
                        borderRadius: "15px",
                        padding: "5px",
                        color: "#cc8500",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <AccessTimeIcon
                        style={{
                          marginRight: 3,
                          marginBottom: 3,
                          color: "#cc8500",
                        }}
                      />
                      Pending
                    </div>
                  )}
                  {row["status"] === "1" && (
                    <div
                      style={{
                        border: "1px solid",
                        borderColor: "#0066ff",
                        borderRadius: "15px",
                        padding: "5px",
                        color: "#0066ff",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <CachedIcon
                        style={{
                          marginRight: 3,
                          marginBottom: 3,
                          color: "#0066ff",
                        }}
                      />
                      In-Progress
                    </div>
                  )}
                  {row["status"] === "2" && (
                    <div
                      style={{
                        border: "1px solid",
                        borderColor: "#008000",
                        borderRadius: "15px",
                        padding: "5px",
                        color: "#008000",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <CheckCircleOutlineIcon
                        style={{
                          marginRight: 3,
                          marginBottom: 3,
                          color: "#008000",
                        }}
                      />
                      Completed
                    </div>
                  )}
                  {row["status"] === "3" && (
                    <div
                      style={{
                        border: "1px solid",
                        borderColor: "#ff0000",
                        borderRadius: "15px",
                        padding: "5px",
                        color: "red",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <ErrorIcon
                        style={{
                          marginRight: 3,
                          marginBottom: 3,
                          color: "red",
                        }}
                      />
                      Rejected
                    </div>
                  )}
                </span>
              ),
            },

            {
              title: "CreatedAt",
              field: "createdAt",
              render: (row) => (
                <Moment format="DD/MM/YYYY HH:mm">{row["createdAt"]}</Moment>
              ),
              editable: "never",
            },
            {
              title: "UpdatedAt",
              field: "updatedAt",
              render: (row) => (
                <Moment format="DD/MM/YYYY HH:mm">{row["updatedAt"]}</Moment>
              ),
              editable: "never",
            },
          ]}
          actions={[
            (postdata) => ({
              icon: () => (
                <Link to={`/timeline/${postdata.id}`}>
                  <CallMadeIcon />
                </Link>
              ),
              tooltip: `Go to (${postdata.title})`,
            }),
          ]}
        />
      </Container>
    </>
  );
}

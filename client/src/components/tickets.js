import React, { useEffect, useState } from "react";
// import Layout from "../core/Layout";
import { getPosts, updateStatus } from "../api/posts";

import { Container } from "react-bootstrap";
import MaterialTable from "material-table";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import CallMadeIcon from "@material-ui/icons/CallMade";
import ErrorIcon from "@material-ui/icons/Error";
import CachedIcon from "@material-ui/icons/Cached";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function TicketsTable() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((result) => setPosts(result.data));
  }, []);

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
      {/* <Layout title="Tickets Page" description="" /> */}
      <Container className="mt-5">
        <MaterialTable
          title="Tickets Table"
          data={postdata}
          columns={[
            // { title: "Id", field: "id" },
            {
              title: "Owner",
              field: "name",
              render: (row) => (
                <div
                  style={{
                    backgroundColor: "#324191",
                    borderRadius: "15px",
                    padding: "5px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    color: "white",
                  }}
                >
                  {row["name"]}
                </div>
              ),
              editable: "never",
            },
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
              title: "Created At",
              field: "createdAt",
              render: (row) => (
                <Moment format="DD/MM/YYYY HH:mm">{row["createdAt"]}</Moment>
              ),
              editable: "never",
            },
            {
              title: "Updated At",
              field: "updatedAt",
              render: (row) => (
                <Moment format="DD/MM/YYYY HH:mm">{row["updatedAt"]}</Moment>
              ),
              editable: "never",
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...posts];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setPosts([...dataUpdate]);

                  resolve(updateStatus(newData));
                }, 100);
              }),
          }}
          actions={[
            (postdata) => ({
              icon: () => (
                <Link to={`/timeline/${postdata.id}`}>
                  <CallMadeIcon />
                </Link>
              ),
              tooltip: `Go to (${postdata.name})`,
            }),
          ]}
        />
      </Container>
    </>
  );
}

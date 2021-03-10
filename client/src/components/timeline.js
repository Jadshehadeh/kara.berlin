import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";

import { getCommentsForPost } from "../api/posts";
import CreateComment from "./createComment";
import Layout from "../core/Layout";

import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import PersonIcon from "@material-ui/icons/Person";
import ScrollUpButton from "react-scroll-up-button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  primarysTail: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function CustomizedTimeline() {
  const classes = useStyles();
  const [comments, setComments] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    getCommentsForPost(id).then((result) => setComments(result.data));
  }, [id]);

  // console.log(comments);

  return (
    <>
      <Layout title="Timeline" description="" />
      <Container style={{ marginTop: 35 }}>
        <CreateComment />
        <Timeline align="alternate">
          {comments.map((sub, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="secondary" variant="outlined">
                  <PersonIcon />
                </TimelineDot>
                <TimelineConnector className={classes.primarysTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography style={{ marginBottom: "10px" }}>
                    User: {sub.userId.firstName} {sub.userId.lastName}
                  </Typography>
                  <Typography variant="h6" component="h1">
                    Text: {sub.comment}
                  </Typography>
                  <Typography
                    style={{ marginTop: "10px" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    Created: <Moment fromNow>{sub.createdAt}</Moment>
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <ScrollUpButton>
                  <ArrowUpwardIcon />
                </ScrollUpButton>
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
    </>
  );
}

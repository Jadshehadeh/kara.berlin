import React from "react";
import { Container } from "react-bootstrap";
import { isAuthenticated } from "../auth/index";
import "./layout.css";

const name = isAuthenticated().firstName + " " + isAuthenticated().lastName;

const Layout = ({ title = "Title", children, className }) => (
  <div>
    <div className="jumbotronHeader">
      <Container>
        <h3>Welcome Back, {name}</h3>
        <p className="lead">{title}</p>
      </Container>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;

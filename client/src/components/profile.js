import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAllPostsForUserId } from "../api/posts";
import { getUserById } from "../api/users";
import { Link } from "react-router-dom";

export default function Profile() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  let { id } = useParams();

  useEffect(() => {
    getAllPostsForUserId(id).then((result) => setData(result.data));
    getUserById(id).then((result) => setUser(result.data));
    return () => {};
  }, [id]);

  const info = data.map((d, index) => ({
    id: d._id,
    fname: d.userId.firstName,
    lname: d.userId.lastName,
    email: d.userId.email,
    phone: d.userId.phoneNumber,
    role: d.userId.role,
    title: d.title,
    description: d.description,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    userId: d.userId._id,
  }));

  return (
    <Container className="mt-5">
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>

        <ul className="list-group">
          <li className="list-group-item">Firstname: {user.firstName}</li>
          <li className="list-group-item">Lastname: {user.lastName}</li>
          <li className="list-group-item">Email: {user.email}</li>
          <li className="list-group-item">Phone Number: {user.phoneNumber}</li>
          <li className="list-group-item">Role: {user.role}</li>
        </ul>
      </div>
      <div className="card">
        <h3 className="card-header">Ticket history</h3>
        <ul className="list-group">
          {info.map((inf, i) => (
            <li className="list-group-item" key={i}>
              Title: <Link to={`/timeline/${inf.id}`}>{inf.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

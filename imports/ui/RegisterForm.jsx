import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState({
    show: false,
    variant: "",
    text: "",
  });

  const submitRegistration = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setShowAlert({
        show: true,
        variant: "danger",
        text: "Username or Password field is blank!",
      });
      setUsername("");
      setPassword("");
    } else {
      Meteor.call("users.insert", username, password, function (err) {
        if (err) {
          setShowAlert({
            show: true,
            variant: "danger",
            text: "Username already exists!",
          });
          setUsername("");
          setPassword("");
        } else {
          setShowAlert({
            show: true,
            variant: "success",
            text: "Registration Successful",
          });
          setUsername("");
          setPassword("");
        }
      });
    }
  };

  return (
    <div className="register-container">
      <h1 style={{ marginBottom: 30 }}>Registration Page</h1>
      <Form className="register-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button onClick={submitRegistration} variant="primary" type="submit">
          Submit
        </Button>
        <Link style={{ marginTop: 10 }} to="/">
          Login
        </Link>
      </Form>
      {showAlert.show && (
        <Alert variant={showAlert.variant}>
          <p>{showAlert.text}</p>
        </Alert>
      )}
    </div>
  );
}

export default withRouter(RegisterForm);

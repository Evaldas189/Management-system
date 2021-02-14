import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState({
    show: false,
    variant: "",
    text: "",
  });
  const history = useHistory();
  const submitLogin = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };
  return (
    <div className="register-container">
      <h1 style={{ marginBottom: 30 }}>Login Page</h1>
      <Form className="register-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button onClick={submitLogin} variant="primary" type="submit">
          Submit
        </Button>
        <Link style={{ marginTop: 10 }} to="/register">
          Register
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

export default LoginForm;

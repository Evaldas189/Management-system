import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import Clients from "./Clients";
import { Meteor } from "meteor/meteor";

function ClientsForm() {
  const [client, setClient] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  });

  const addClient = (e) => {
    e.preventDefault();
    if (!client.firstname || !client.lastname || !client.phone) return;

    Meteor.call(
      "clients.insert",
      client.firstname,
      client.lastname,
      client.phone
    );

    setClient({ firstname: "", lastname: "", phone: "" });
  };

  return (
    <div className="goodsForm-container">
      <Form>
        <Form.Row>
          <Col>
            <Form.Control
              value={client.firstname}
              onChange={(e) =>
                setClient({ ...client, firstname: e.target.value })
              }
              placeholder="FirstName"
            />
          </Col>
          <Col>
            <Form.Control
              value={client.lastname}
              onChange={(e) =>
                setClient({ ...client, lastname: e.target.value })
              }
              placeholder="LastName"
            />
          </Col>
          <Col>
            <Form.Control
              value={client.phone}
              onChange={(e) => setClient({ ...client, phone: e.target.value })}
              placeholder="Phone"
            />
          </Col>
          <Button onClick={addClient} variant="primary" type="submit">
            Add
          </Button>
        </Form.Row>
      </Form>
      <Clients />
    </div>
  );
}

export default ClientsForm;

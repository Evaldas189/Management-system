import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import Good from "./Good";
import { Meteor } from "meteor/meteor";

function GoodsForm() {
  const [good, setGood] = useState({ name: "", description: "", price: "" });

  const addGood = (e) => {
    e.preventDefault();
    if (!good.name || !good.price) return;

    Meteor.call("goods.insert", good.name, good.description, good.price);

    setGood({ name: "", description: "", price: "" });
  };

  return (
    <div className="goodsForm-container">
      <Form>
        <Form.Row>
          <Col>
            <Form.Control
              value={good.name}
              onChange={(e) => setGood({ ...good, name: e.target.value })}
              placeholder="Name"
            />
          </Col>
          <Col xs={7}>
            <Form.Control
              value={good.description}
              onChange={(e) =>
                setGood({ ...good, description: e.target.value })
              }
              placeholder="Description"
            />
          </Col>
          <Col>
            <Form.Control
              value={good.price}
              onChange={(e) => setGood({ ...good, price: e.target.value })}
              placeholder="Price"
            />
          </Col>
          <Button onClick={addGood} variant="primary" type="submit">
            Add
          </Button>
        </Form.Row>
      </Form>
      <Good />
    </div>
  );
}

export default GoodsForm;

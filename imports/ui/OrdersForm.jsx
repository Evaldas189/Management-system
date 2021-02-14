import React, { useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Orders from "./Orders";
import { Meteor } from "meteor/meteor";
import { ClientsCollection } from "../db/ClientsCollection";
import { GoodsCollection } from "../db/GoodsCollection";
import { useTracker } from "meteor/react-meteor-data";

function OrdersForm() {
  const [order, setOrder] = useState({
    fullname: "Client Full Name",
    good: "Good",
    fullPrice: 0,
  });
  const [goodAmount, setGoodAmount] = useState(1);
  const [goodPrice, setGoodPrice] = useState(0);

  const addOrder = (e) => {
    e.preventDefault();
    if (order.good == "Good" || order.fullname == "Client Full Name") return;

    Meteor.call(
      "orders.insert",
      order.fullname,
      order.good,
      goodAmount,
      goodPrice * goodAmount
    );

    setOrder({
      fullname: "Client Full Name",
      good: "Good",
      fullPrice: "",
    });
  };
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};

  const { clients, isLoadingClients } = useTracker(() => {
    const noDataAvailable = { clients: [] };
    const handler = Meteor.subscribe("clients");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoadingClients: true };
    }
    const clients = ClientsCollection.find(userFilter, {
      sort: { createdAt: 1 },
    }).fetch();
    return { clients };
  });
  const { goods, isLoadingGoods } = useTracker(() => {
    const noDataAvailable = { goods: [] };
    const handler = Meteor.subscribe("goods");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoadingGoods: true };
    }
    const goods = GoodsCollection.find(userFilter, {
      sort: { createdAt: 1 },
    }).fetch();
    return { goods };
  });

  const amountIncrease = () => {
    setGoodAmount(goodAmount + 1);
  };
  const amountDecrease = () => {
    if (goodAmount !== 1) {
      setGoodAmount(goodAmount - 1);
    }
  };
  const findPrice = (e) => {
    newGood = goods.filter((good) => good.name === e);
    setGoodPrice(newGood[0].price);
  };

  return (
    <div className="goodsForm-container">
      <Form>
        <Form.Row>
          <Col>
            <DropdownButton
              onSelect={(e) => {
                setOrder({ ...order, fullname: e });
              }}
              variant="info"
              title={order.fullname}
            >
              {isLoadingClients && <div className="loading">loading...</div>}
              {clients.map((client) => (
                <Dropdown.Item
                  eventKey={client.firstName + " " + client.lastName}
                >
                  {client.firstName + " " + client.lastName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton
              onSelect={(e) => {
                setOrder({ ...order, good: e });
                findPrice(e);
              }}
              variant="info"
              title={order.good}
            >
              {isLoadingGoods && <div className="loading">loading...</div>}
              {goods.map((good) => (
                <Dropdown.Item eventKey={good.name}>{good.name}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col>
            <Form.Control value={goodPrice} placeholder="0.00" readOnly />
          </Col>
          <Button
            style={{ marginLeft: 20, width: 35 }}
            onClick={amountDecrease}
            variant="primary"
            type="button"
          >
            -
          </Button>
          <Col xs={1}>
            <Form.Control
              value={goodAmount}
              placeholder="0"
              style={{ textAlign: "center" }}
            />
          </Col>
          <Button
            style={{ marginRight: 20, width: 35 }}
            onClick={amountIncrease}
            variant="primary"
            type="button"
          >
            +
          </Button>
          <Form.Label style={{ marginTop: 5, marginRight: 10 }}>
            Full Price:{" "}
          </Form.Label>
          <Col>
            <Form.Control
              value={goodPrice * goodAmount}
              placeholder="0.00"
              readOnly
            />
          </Col>

          <Button
            style={{ marginLeft: 20, width: 80 }}
            onClick={addOrder}
            variant="primary"
            type="submit"
          >
            Add
          </Button>
        </Form.Row>
      </Form>
      <Orders />
    </div>
  );
}

export default OrdersForm;

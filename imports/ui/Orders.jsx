import React from "react";
import { Table } from "react-bootstrap";
import Order from "./Order";
import { useTracker } from "meteor/react-meteor-data";
import { OrdersCollection } from "../db/OrdersCollection";
import { Meteor } from "meteor/meteor";

function Orders() {
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};

  const { orders, isLoading } = useTracker(() => {
    const noDataAvailable = { orders: [] };
    const handler = Meteor.subscribe("orders");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const orders = OrdersCollection.find(userFilter, {
      sort: { createdAt: 1 },
    }).fetch();
    return { orders };
  });

  return (
    <div>
      <div className="goodsTable-container">
        {isLoading && <div className="loading">loading...</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Good</th>
              <th>Amount</th>
              <th>Full Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <Order
                key={order._id}
                index={index + 1}
                fullname={order.fullName}
                good={order.good}
                amount={order.amount}
                fullPrice={"$" + order.fullPrice}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Orders;

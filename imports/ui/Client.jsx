import React from "react";
import { OrdersCollection } from "../db/OrdersCollection";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

function Client({ index, firstname, lastname, phone }) {
  const user = useTracker(() => Meteor.user());
  const userFilter = user
    ? { userId: user._id, fullName: firstname + " " + lastname }
    : {};
 
  const { orders, isLoading } = useTracker(() => {
    const noDataAvailable = { orders: [] };
    const handler = Meteor.subscribe("orders");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const orders = OrdersCollection.find(userFilter).fetch();
    return { orders };
  });
  return (
    <tr>
      <td>{index}</td>
      <td>{firstname}</td>
      <td>{lastname}</td>
      <td>{phone}</td>
      {orders.length === 0 ? (
        <td>No Orders yet</td>
      ) : (
        <Link
          style={{ marginLeft: 10 }}
          to={{
            pathname: "/clientOrders",
            orderProps: {
              orders: orders,
            },
          }}
        >
          {isLoading && <div className="loading">loading...</div>}
          Orders
        </Link>
      )}
    </tr>
  );
}

export default Client;

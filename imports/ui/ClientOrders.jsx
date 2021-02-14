import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Order from "./Order";

function ClientOrders(props) {
  const history = useHistory();
  console.log(props);
  if (props.location.orderProps === undefined) {
    history.push("/clients");
  } else {
    const orders = props.location.orderProps.orders;
    return (
      <div className="goodsPage-container">
        <h1>{orders[0].fullName} Orders</h1>
        <div className="goodsTable-container">
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
  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default ClientOrders;

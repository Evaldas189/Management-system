import React from "react";
import { Table } from "react-bootstrap";
import Client from "./Client";
import { useTracker } from "meteor/react-meteor-data";
import { ClientsCollection } from "../db/ClientsCollection";
import { Meteor } from "meteor/meteor";

function Clients() {
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};

  const { clients, isLoading } = useTracker(() => {
    const noDataAvailable = { clients: [] };
    const handler = Meteor.subscribe("clients");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const clients = ClientsCollection.find(userFilter, {
      sort: { createdAt: 1 },
    }).fetch();
    return { clients };
  });

  return (
    <div>
      <div className="goodsTable-container">
        {isLoading && <div className="loading">loading...</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <Client
                key={client._id}
                index={index + 1}
                firstname={client.firstName}
                lastname={client.lastName}
                phone={client.phone}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Clients;

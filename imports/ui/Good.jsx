import React from "react";
import { Table } from "react-bootstrap";
import GoodsTableItem from "./GoodsTableItem";
import { useTracker } from "meteor/react-meteor-data";
import { GoodsCollection } from "../db/GoodsCollection";
import { Meteor } from "meteor/meteor";

function Good() {
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};
  const { goods, isLoading } = useTracker(() => {
    const noDataAvailable = { goods: [] };
    const handler = Meteor.subscribe("goods");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const goods = GoodsCollection.find(userFilter, {
      sort: { createdAt: 1 },
    }).fetch();
    return { goods };
  });

  return (
    <div className="goodsTable-container">
      {isLoading && <div className="loading">loading...</div>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((good, index) => (
            <GoodsTableItem
              key={good._id}
              index={index + 1}
              name={good.name}
              description={good.description}
              price={good.price}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Good;

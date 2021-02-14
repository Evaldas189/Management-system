import { Meteor } from "meteor/meteor";
import { OrdersCollection } from "/imports/db/OrdersCollection";

Meteor.publish("orders", function publishTasks() {
  return OrdersCollection.find({ userId: this.userId });
});

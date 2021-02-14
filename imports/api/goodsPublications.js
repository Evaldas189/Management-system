import { Meteor } from "meteor/meteor";
import { GoodsCollection } from "/imports/db/GoodsCollection";

Meteor.publish("goods", function publishTasks() {
  return GoodsCollection.find({ userId: this.userId });
});

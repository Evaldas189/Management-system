import { check } from "meteor/check";
import { GoodsCollection } from "../db/GoodsCollection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "goods.insert"(name, description, price) {
    check(name, String);
    check(description, String);
    check(price, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    GoodsCollection.insert({
      name,
      description,
      price,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
});

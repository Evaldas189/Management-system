import { check } from "meteor/check";
import { OrdersCollection } from "../db/OrdersCollection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "orders.insert"(fullName, good, amount, fullPrice) {
    check(fullName, String);
    check(good, String);
    check(amount, Number);
    check(fullPrice, Number);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    OrdersCollection.insert({
      fullName,
      good,
      amount,
      fullPrice,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
});

import { check } from "meteor/check";
import { ClientsCollection } from "../db/ClientsCollection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "clients.insert"(firstName, lastName, phone) {
    check(firstName, String);
    check(lastName, String);
    check(phone, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    ClientsCollection.insert({
      firstName,
      lastName,
      phone,
      createdAt: new Date(),
      userId: this.userId,
    });
  },
});

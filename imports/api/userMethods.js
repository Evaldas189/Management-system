import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "users.insert"(username, password) {
    check(username, String);
    check(password, String);

    const userExists = Accounts.findUserByEmail(username);

    if (!userExists) {
      Accounts.createUser({ username, password });
    }
  },
});

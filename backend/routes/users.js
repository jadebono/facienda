// user.js
// routes for all interactions with users
"use strict";

import dotenv from "dotenv";
import express from "express";
import { encipher, decipher } from "../encryption.js";
import HashString from "../mongoConnect.js";
import {
  deleteFromDB,
  LoadFromDB,
  SaveToDB,
  updateDB,
} from "../mongoConnect.js";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import {
  signSessionToken,
  validateSessionToken,
  decryptSessionToken,
} from "../token.js";
export const usersRouter = express.Router();

dotenv.config();

/* async function to test if any of the user's data exists in encrypted form in the users collections */
async function testUsersData(key, value) {
  const obj = { [key]: value };
  const test = await LoadFromDB(process.env.DB_COLLECTION_USERS, obj)
    .then((response) => {
      if (response.length) {
        const user = response[0];
        return user[key] === value ? true : false;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
  return test;
}

/*
Name and surname do not have to be unique
enforce unique user name & encrypt
enforce unique email & encrypt
Upon registration notify user that he has been registered and request him to log in to his account
*/
//post to register user
usersRouter.route("/register").post(async (req, res) => {
  const { name, surname, username, email, password } = req.body;
  // Hash password
  const hashedPassword = HashString(password);
  // encrypt name, surname, username, email
  const encryptedName = encipher(name);
  const encryptedSurname = encipher(surname);
  const encryptedUsername = encipher(username);
  const encryptedEmail = encipher(email);

  /*
  test whether username and email are already registered, if not stop registration and inform registrant. 
     */
  const testUserName = await testUsersData("username", encryptedUsername);
  const testEmail = await testUsersData("email", encryptedEmail);
  if (testUserName && testEmail) {
    console.log("username and email already registered!");
    res.send("bothTaken");
  } else if (testUserName) {
    console.log("username already registered!");
    res.send("usernameTaken");
  } else if (testEmail) {
    console.log("Email already registered!");
    res.send("emailTaken");
  } else {
    // register user
    await SaveToDB(process.env.DB_COLLECTION_USERS, {
      name: encryptedName,
      surname: encryptedSurname,
      username: encryptedUsername,
      email: encryptedEmail,
      password: hashedPassword,
    });
    res.send("registered");
  }
});

//post to signin user
usersRouter.route("/login").post(async (req, res) => {
  const { username, password } = req.body.userData;
  // encrypt username
  const encryptedUsername = encipher(username);
  // hash password
  const hashedPassword = HashString(password);
  // search collection users for someone with this username
  await LoadFromDB(process.env.DB_COLLECTION_USERS, {
    username: encryptedUsername,
  })
    .then((response) => {
      // destructure and decrypt data
      const user = response[0];
      // check that user is not "undefined"
      if (!user) {
        res.send({
          login: false,
          userId: "",
          username: "",
          token: "",
        });
        // if username exists AND password matches
      } else if (
        encryptedUsername === user.username &&
        hashedPassword === user.password
      ) {
        // generate token
        const token = signSessionToken(user._id);
        res.send({
          login: true,
          userId: user._id,
          username: username,
          token: token,
        });
        console.log("Successful login!");
      }
      // if username exists but password is incorrect
      // send an empty object with login: false
      else {
        res.send({
          login: false,
          userId: "",
          username: "",
          token: "",
        });
        console.log("Invalid login!");
      }
    })
    .catch((error) => console.log(error));
});

// route to validate session
usersRouter.route("/validatesession").post((req, res) => {
  let token = req.body.cookie;
  res.send(validateSessionToken(token));
});

// route to sign in a user if session is still active
usersRouter.route("/sessionSignin").post(async (req, res) => {
  let token = req.body.cookie;
  let user = decryptSessionToken(token);
  // fetch user data
  if (user) {
    await LoadFromDB(process.env.DB_COLLECTION_USERS, {
      _id: { $eq: new ObjectId(user) },
    })
      .then((response) => {
        const loggedUser = response.pop();
        const username = decipher(loggedUser.username);
        res.send({
          id: loggedUser._id,
          username: username,
        });
        console.log("User session successfully restored");
      })
      .catch((err) => {
        res.send({
          id: "",
          username: "",
        });
        console.log("There was some error!");
      });
  } else {
    res.send({
      id: "",
      username: "",
    });
    console.log("User was not authenticated!");
  }
});

// route to close a user's account
usersRouter.route("/deleteUser").post(async (req, res) => {
  const user = req.body.userId;
  // Check if user has subscriptions and if so delete his document in the subscriptions collection
  try {
    // Get user details from DB_COLLECTION_USERS
    const response = await LoadFromDB(process.env.DB_COLLECTION_USERS, {
      _id: { $eq: new ObjectId(user) },
    });
    // Extract and decipher the username
    const decipheredUsername = decipher(response[0].username);
    // test username by ID
    const testSubscriptions = await testSubscriptionData(
      "username",
      encipher(decipheredUsername)
    );
    if (testSubscriptions) {
      const fieldData = encipher(decipheredUsername);
      await deleteFromDB(process.env.DB_COLLECTION_SUBSCRIPTIONS, {
        username: fieldData,
      });
      console.log("Subscription data successfully deleted");
    } else {
      console.log("No subscription data found to delete");
    }
  } catch (error) {
    console.log("An error occurred:", error);
  }
  // Now delete the user's document from the users collections
  try {
    await deleteFromDB(process.env.DB_COLLECTION_USERS, {
      _id: { $eq: new ObjectId(user) },
    });
    res.send(true);
    console.log("Account successfully closed!");
  } catch (err) {
    res.send(false);
    console.log("Error during deletion:", err);
  }
});

// route to retrieve user details
usersRouter.route("/details").post(async (req, res) => {
  const user = req.body.userId;
  await LoadFromDB(process.env.DB_COLLECTION_USERS, {
    _id: { $eq: new ObjectId(user) },
  })
    .then((response) => {
      const loggedUser = response.pop();
      const name = decipher(loggedUser.name);
      const surname = decipher(loggedUser.surname);
      const username = decipher(loggedUser.username);
      const email = decipher(loggedUser.email);
      res.send({
        name: name,
        surname: surname,
        username: username,
        email: email,
      });
      console.log(`user details successfully retrieved!`);
    })
    .catch((err) => {
      res.send(false);
      console.log("An unknown problem has occurred");
    });
});

// update user details routes start here =>

// route to update username
usersRouter.route("/updateusername").post(async (req, res) => {
  const username = req.body.username;
  const userId = req.body.userId;
  // encrypt username
  const encryptedUsername = encipher(username);
  // search collection users for someone with this username
  const usernameExists = await LoadFromDB(process.env.DB_COLLECTION_USERS, {
    username: encryptedUsername,
  });
  // if username does NOT exist, update record
  if (usernameExists.length === 0) {
    await updateDB(
      process.env.DB_COLLECTION_USERS,
      { _id: ObjectId(userId) },
      { username: encryptedUsername }
    );
    res.send("usernameUpdated");
    console.log("username changed!");
  } else {
    res.send("usernameTaken");
    console.log("That username already exists!");
  }
});

// route to update email
usersRouter.route("/updateemail").post(async (req, res) => {
  const email = req.body.email;
  const userId = req.body.userId;
  // encrypt email
  const encryptedEmail = encipher(email);
  // search collection users for someone with this email
  const emailExists = await LoadFromDB(process.env.DB_COLLECTION_USERS, {
    email: encryptedEmail,
  });
  // if email does NOT exist, update record
  if (emailExists.length === 0) {
    await updateDB(
      process.env.DB_COLLECTION_USERS,
      { _id: ObjectId(userId) },
      { email: encryptedEmail }
    );
    res.send("emailUpdated");
    console.log("email changed!");
  } else {
    res.send("emailTaken");
    console.log("Unknown problem with that email");
  }
});

// route to update password
usersRouter.route("/updatepwd").post(async (req, res) => {
  // hash password
  const password = HashString(req.body.password);
  const userId = req.body.userId;

  // update password
  try {
    await updateDB(
      process.env.DB_COLLECTION_USERS,
      { _id: ObjectId(userId) },
      { password: password }
    );
    res.send("passwordUpdated");
    console.log("Password changed!");
  } catch (error) {
    res.send("passwordProblem");
    console.log("Unknown problem with that password");
  }
});

// <- update user details routes end here

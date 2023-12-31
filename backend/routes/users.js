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
import { ObjectId } from "mongodb";
import {
  signSessionToken,
  validateSessionToken,
  decryptSessionToken,
} from "../token.js";
import { testSubscribersData } from "../routes/subscribers.js";
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
// Define route to handle user login
usersRouter.route("/login").post(async (req, res) => {
  try {
    // Extract username and password from the request
    const { username, password } = req.body.userData;

    // Encrypt the username and hash the password for security
    const encryptedUsername = encipher(username);
    const hashedPassword = HashString(password);

    // Retrieve users from the database with the encrypted username
    const users = await LoadFromDB(process.env.DB_COLLECTION_USERS, {
      username: encryptedUsername,
    });

    // Extract the first user from the response
    const user = users[0];

    // If user doesn't exist, send an appropriate response
    if (!user) {
      return res.send({
        login: false,
        userId: "",
        username: "",
        token: "",
      });
    }

    // If the encrypted username and hashed password match the database entry
    if (
      encryptedUsername === user.username &&
      hashedPassword === user.password
    ) {
      // Generate a session token for the user
      const token = signSessionToken(user._id);

      // Fetch tasks related to this user from the tasks collection
      const tasksResponse = await LoadFromDB(process.env.DB_COLLECTION_TASKS, {
        _id: { $eq: new ObjectId(user._id) },
      });

      // Extract tasks from the response or default to an empty array if none found
      const tasks = tasksResponse.length ? tasksResponse[0].task : [];
      tasks.forEach((task) => {});
      // decipher tasks:
      const decipheredTasks = tasks.map((task) => {
        return {
          id: JSON.parse(decipher(task.id)),
          task: JSON.parse(decipher(task.task)),
          label: JSON.parse(decipher(task.label)),
          priority: JSON.parse(decipher(task.priority)),
          dueTime: JSON.parse(decipher(task.dueTime)),
          dueDate: JSON.parse(decipher(task.dueDate)),
        };
      });

      // Send a successful login response with user details and tasks
      return res.send({
        login: true,
        userId: user._id,
        username: username,
        token: token,
        tasks: decipheredTasks,
      });
    }

    // If username exists but password doesn't match, send a failed login response
    res.send({
      login: false,
      userId: "",
      username: "",
      token: "",
    });
  } catch (error) {
    // Log any errors and send a server error response
    console.log(error);
    res.status(500).send("Server error");
  }
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
    }).then(async (response) => {
      const loggedUser = response.pop();
      const username = decipher(loggedUser.username);
      // Fetch tasks related to this user from the tasks collection
      const tasksResponse = await LoadFromDB(process.env.DB_COLLECTION_TASKS, {
        _id: { $eq: new ObjectId(user) },
      });

      // Extract tasks from the response or default to an empty array if none found
      const tasks = tasksResponse.length ? tasksResponse[0].task : [];

      // decipher tasks:
      const decipheredTasks = tasks.map((task) => {
        return {
          id: JSON.parse(decipher(task.id)),
          task: JSON.parse(decipher(task.task)),
          label: JSON.parse(decipher(task.label)),
          priority: JSON.parse(decipher(task.priority)),
          dueTime: JSON.parse(decipher(task.dueTime)),
          dueDate: JSON.parse(decipher(task.dueDate)),
        };
      });

      res.send({
        id: loggedUser._id,
        username: username,
        tasks: decipheredTasks,
      });
      console.log("User session successfully restored");
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
  // Get user details from DB_COLLECTION_USERS
  const response = await LoadFromDB(process.env.DB_COLLECTION_USERS, {
    _id: { $eq: new ObjectId(user) },
  });

  // extract enciphered email
  const encipheredEmail = response[0].email;
  // Check to make sure submitted email is already there
  const testEmail = await testSubscribersData("email", encipheredEmail);
  // if email exists delete user's record
  try {
    if (testEmail) {
      await deleteFromDB(process.env.DB_COLLECTION_SUBSCRIBERS, {
        email: encipheredEmail,
      });
      console.log("Email successfully unsubscribed");
    }
    // Next delete user's tasks document
    await deleteFromDB(process.env.DB_COLLECTION_TASKS, {
      _id: { $eq: new ObjectId(user) },
    });
    console.log("Tasks data successfully closed!");
    // Finally delete a user's users document
    await deleteFromDB(process.env.DB_COLLECTION_USERS, {
      _id: { $eq: new ObjectId(user) },
    });
    console.log("Account successfully closed!");

    res.send(true);
  } catch (err) {
    console.error("Error during deletion:", err);
    res.send(false);
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

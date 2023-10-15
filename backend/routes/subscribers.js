// subscribers.js
// routes for all interactions with subscribers to newletter
"use strict";

import dotenv from "dotenv";
import express from "express";
import { encipher } from "../encryption.js";
import { deleteFromDB, LoadFromDB, SaveToDB } from "../mongoConnect.js";
import nodemailer from "nodemailer";
export const subscribersRouter = express.Router();

dotenv.config();

/* async function to test if any of the user's data exists in encrypted form in the subscribers collection */
export async function testSubscribersData(key, value) {
  const obj = { [key]: value };
  const test = await LoadFromDB(process.env.DB_COLLECTION_SUBSCRIBERS, obj)
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

// post route to subscribe a user to the newsletter
subscribersRouter.route("/subscribe").post(async (req, res) => {
  const { name, surname, email } = req.body;
  // encrypt data
  const encipheredName = encipher(name);
  const encipheredSurname = encipher(surname);
  const encipheredEmail = encipher(email);
  // Check to make sure submitted email is not already there
  const testEmail = await testSubscribersData("email", encipheredEmail);
  // if email does not exist, add user to list of subscribers
  if (testEmail) {
    res.send("Email is already subscribed!");
    console.log("Email is already subscribed!");
  } else {
    console.log(process.env.DB_COLLECTION_SUBSCRIBERS);
    await SaveToDB(process.env.DB_COLLECTION_SUBSCRIBERS, {
      name: encipheredName,
      surname: encipheredSurname,
      email: encipheredEmail,
    })
      .then(() => {
        res.send(true);
        console.log("Subscription succeeded!");
      })
      .catch((err) => {
        res.send(false);
        console.log("Subscription Failed");
      });
  }
});

// post route to delete a user from the newsletter
subscribersRouter.route("/unsubscribe").post(async (req, res) => {
  const { email } = req.body;
  const encipheredEmail = encipher(email);
  // Check to make sure submitted email is already there
  const testEmail = await testSubscribersData("email", encipheredEmail);
  // if email exists delete user's record

  if (testEmail) {
    // delete record
    await deleteFromDB(process.env.DB_COLLECTION_SUBSCRIBERS, {
      email: encipheredEmail,
    })
      .then(() => {
        res.send(true);
        console.log("Email successfully unsubscribed");
      })
      .catch((err) => {
        res.send(false);
        console.log("Attempt to unsubscribe has failed!");
      });
  } else {
    res.send("That email is not subscribed!");
    console.log("That email is not subscribed!");
  }
});

// post from contact form to email account (mailtrap.io)
subscribersRouter.route("/contact").post(async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let body = req.body.body;

  //create transport for nodemailer
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // run transport
  await transport
    .sendMail({
      from: email,
      to: "joe@test.com",
      subject: subject,
      html: `<div className="">
      <h2>Here is your email!</h2>
      <p>${body}</p>
      <p>Yours Sincerely</p>
      <p>${name}</p>
      </div>`,
    })
    .then(() => {
      res.send(true);
      console.log("Received email from contact form!");
    })
    .catch((error) => {
      res.send(false);
      console.log(
        "An attempt to send an email from the contact form was made but it failed"
      );
    });
});

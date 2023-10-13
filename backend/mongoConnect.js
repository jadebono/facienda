// mongoConnect.js
"use strict";

import { createHmac } from "crypto";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// connection URI
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ecom.9evjz.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

//create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect the client to the platform database
const db = client.db(process.env.DB_NAME);

// create a test connection
export async function TestConnectMDB() {
  try {
    await client.db(process.env.DB_USERNAME).command({ ping: 1 });
    console.log(`connected successfully`);
  } catch (error) {
    console.log(error);
  }
}

// create connection
export async function ConnectMDB() {
  await client
    .connect()
    .then(console.log("Connected successfullY to database!"))
    .catch((error) => console.log(error));
}

// close connection
export async function CloseMDB() {
  await client
    .close()
    .then(console.log("Connection to database closed successfullY!"))
    .catch((error) => console.log(error));
}

// function to add document to a collection
export async function SaveToDB(col, data) {
  try {
    await db.collection(col).insertOne(data);
  } catch (error) {
    console.log(error);
  }
}

// function to retrieve document from a collection
export async function LoadFromDB(col, item) {
  try {
    return await db.collection(col).find(item).toArray();
  } catch (error) {
    console.log(error);
  }
}

// function to update document in a collection
export async function updateDB(col, filter, data) {
  try {
    await db.collection(col).updateOne(filter, { $set: data });
  } catch (error) {
    console.log(error);
  }
}

// The db.collection.updateMany() method updates all documents in the collection that match the specified filter with the specified update.
// In this case it will be used to update an array in a document
export async function updateArrayDB(col, filter, field, value) {
  try {
    await db.collection(col).updateMany(filter, [
      {
        $set: {
          [field]: {
            $cond: [
              { $isArray: `$${field}` },
              { $concatArrays: [`$${field}`, [value]] },
              [value],
            ],
          },
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

// function to delete a document in a collection
export async function deleteFromDB(col, item) {
  try {
    await db.collection(col).deleteOne(item);
  } catch (error) {
    console.log(error);
  }
}

// function to retrieve a specific document by _id from a collection
export async function LoadByIdFromDB(col, idString) {
  try {
    return await db
      .collection(col)
      .find({
        _id: new ObjectId(idString),
      })
      .toArray();
  } catch (error) {
    console.log(error);
    return null; // Return null or an appropriate value to indicate failure
  }
}

// HMAC function
export default function HashString(password) {
  return createHmac("sha256", process.env.HMAC).update(password).digest("hex");
}

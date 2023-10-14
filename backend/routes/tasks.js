// tasks.js
// routes for all interactions with tasks collection
// *use JSON.stringify and JSON.parse when saving and retrieving tasks data
"use strict";

import dotenv from "dotenv";
import express from "express";
import { encipher, decipher } from "../encryption.js";
import {
  deleteFromDB,
  LoadFromDB,
  SaveToDB,
  updateDB,
  updateTasksArray,
} from "../mongoConnect.js";

import { ObjectId } from "mongodb";

export const tasksRouter = express.Router();

dotenv.config();

/* async function to test if a user has a document in the tasks collection.
parameter userId is an ObjectId(userId)

*/
async function testUsersData(userId) {
  const test = await LoadFromDB(process.env.DB_COLLECTION_TASKS, {
    _id: { $eq: userId },
  })
    .then((response) => {
      if (response.length) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
  return test;
}

//post to save tasks in tasks collection
tasksRouter.route("/post").post(async (req, res) => {
  const { userId, tasks } = req.body;
  //   console.log(userId, tasks);
  const user = new ObjectId(userId);
  const id = encipher(JSON.stringify(tasks.id));
  const task = encipher(JSON.stringify(tasks.task));
  const label = encipher(JSON.stringify(tasks.label));
  const priority = encipher(JSON.stringify(tasks.priority));
  const timeDue = encipher(JSON.stringify(tasks.dueTime));
  const dateDue = encipher(JSON.stringify(tasks.dueDate));
  //   create object to save in tasks collection:
  const dbData = {
    _id: user,
    task: [
      {
        id: id,
        task: task,
        label: label,
        priority: priority,
        dueTime: timeDue,
        dueDate: dateDue,
      },
    ],
  };

  // Check if user exists
  const isUser = await testUsersData(user);
  if (isUser) {
    // add the task array in dbData to the task array in the database taking it from the task
    // array in dbData
    const newTask = dbData.task[0];
    await updateTasksArray(process.env.DB_COLLECTION_TASKS, user, newTask);
    res.send("Task added");
  } else {
    // create first record
    await SaveToDB(process.env.DB_COLLECTION_TASKS, dbData);
    res.send("registered");
  }
});

// post to delete tasks
tasksRouter.route("/delete").post(async (req, res) => {
  // first retrieve the user's document from tasks collection using the _id field
  // then decipher the fields from the user's document
  // then look for the tasks item in the tasks array with the corresponding task id
  // finally delete the task item in the tasks array that bears the corresponding task id
  try {
    const { userId, taskId } = req.body; // Assuming taskId is passed in the request body
    const userObjectId = new ObjectId(userId);
    const userTaskId = taskId;

    // Retrieve the user's document
    const userTasks = await LoadFromDB(process.env.DB_COLLECTION_TASKS, {
      _id: userObjectId,
    });

    if (!userTasks || !userTasks.length) {
      res.status(404).send("User not found");
      return;
    }

    const tasksArray = userTasks[0].task;

    // Find index of task with corresponding taskId
    const taskIndex = tasksArray.findIndex(
      (task) => JSON.parse(decipher(task.id)) === userTaskId
    );

    if (taskIndex === -1) {
      res.status(404).send("Task not found");
      return;
    }

    // Remove the task from the tasks array
    tasksArray.splice(taskIndex, 1);

    // Update the tasks array in the database
    await updateDB(
      process.env.DB_COLLECTION_TASKS,
      { _id: userObjectId },
      { task: tasksArray }
    );

    res.send("Task deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

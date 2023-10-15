# `Facienda - A To-Do App`

**Author:** Joseph Anthony Debono,  
**email:** [joe@jadebono.com](joe@jadebono.com)  
**Frontend:** [Localhost:3000](http:localhost:3000/)  
**Backend:** [Localhost:4000](http:localhost:4000/)  
**Date of commencement:** 13 October 2023  
**Date of completion:** 15 October 2023
**License:** MIT

---

# `Name and Tagline`

**Facienda** - A To-Do MERN App  
_Order your life_

---

# Functionality

## `Implemented features`

1. Offers any user the facility to subscribe to a newsletter, send an email to the application, register an account, and log in;
1. Any user may create tasks but tasks are not saved unless the user registers an account and is logged-in;
1. The tasks created by a logged-in user will be saved in the database and retrieved every time he logs in, and a logged-in user has comprehensive account control facilities through the user account roundel on the far-right;
   - A logged-in user can log out;
   - A logged-in user can close his account and the system will delete all his data in all the database collections in which he has data;
   - A logged-in user can change his username, email, and password;
   - Any task a logged-in user creates will be saved in the tasks collection of the db, and will be retrieved any time he logs in or restores a session;
   - If a user deletes a task, it will be deleted in the db;
   - A user's registration details and all his data will be saved in encrypted form in the db, except the password, the hash of which is saved, and the ObjectId.
1. Any number of user accounts supported, with different users having their own unique tasks;
1. The task-creation form creates a task with the following data: task, label, priority, due time and due date. The task card displays all this data in the appropriate fields;
1. The task card has a bar running at the top the colour of which indicates the priority: {high: red, medium: orange, low: green}. This bar also provides a white button with a black x that deletes the task;
1. The field of the priority label at the bottom of the task card is also colour coded in the same way: {high: red, medium: orange, low: green};
1. Once the due time and due date expire, they are displayed in light font with a strikethrough to indicate that the alloted time has expired;
1. The mechanism to deal with the completion of the task is to delete it by clicking on the white button with the black x in the top right-hand corner of the task card;
1. Authentication, and session persistence and session retrieval implemented:
   - Sessions are tracked using a cookie created using jwt from jsonwebtoken package;
   - If a logged-in user does not log out, the session will persist for four hours;
   - If a logged-in user closes the web browser before the expiry of the session cookie (four hours duration), the session will be retrieved once more when he opens the browser and navigates to the app's link (in development mode: [Localhost:3000](http:localhost:3000/));
1. Notification system using a colour-coded toast element.

---

# Frontend

This project was bootstrapped with:

[Create React App](https://github.com/facebook/create-react-app)  
[React Redux](https://react-redux.js.org/)  
[Redux Toolkit](https://redux-toolkit.js.org/)  
[Tailwind](https://tailwindcss.com/)

In the frontend/ directory, you can run:

```bash
npm start
```

This runs the app in development mode. The default port is 3000:
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

**Note**:

The the frontend expects to connect to a backend running on port 4000. If your backend is running on any other port, you will have to change the port in the relevant environmental variable in the .env files of BOTH the frontend and the backend.

## Available Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

---

# `Installing and running the Frontend`

installing and running the the frontend:

```bash
cd frontend
npm install
npm start
```

## `dependencies`

1. "@reduxjs/toolkit": "^1.8.1",
1. "@testing-library/jest-dom": "^5.16.4",
1. "@testing-library/react": "^12.1.4",
1. "@testing-library/user-event": "^13.5.0",
1. "axios": "^0.26.1",
1. "react": "^18.0.0",
1. "react-dom": "^18.0.0",
1. "react-redux": "^7.2.8",
1. "react-router-dom": "^6.3.0",
1. "react-scripts": "5.0.0",
1. "redux": "^4.1.2",
1. "redux-persist": "^6.0.0",
1. "uuid": "^8.3.2",
1. "web-vitals": "^2.1.4"

## `Integrated Dependencies`

Tailwind comes integrated with this version of Create-React-App. Just add:

1. frontend/tailwind.config.js
1. frontend/src/index.css

contents of frontend/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## `Notifications`

<Notifications/>

Notifications types and styles

success: bar: bg-green-500, notification: bg-green-100, bar css: .success
notify: bar: bg-blue-500, notification: bg-blue-100, bar css: .notify
error: bar: bg-red-500, notification: bg-red-100, bar css: .error
warning: bar: bg-orange-500, notification: bg-orange-100, bar css: .warning

### `Procedure to generate a notification`

To update notify state and generate a notification:

1. Post/get request
1. Await response
1. if response is valid, send: message: success message, type: success/notify
1. if response is an error, send: message: error message!, type: error/warning

---

# `Backend`

installing the backend

```bash
cd backend
npm install
```

**Note**:

The server on my localhost runs on port: 4000. If this is not available, you can choose any available port and update the environmental variable PORT

## `Running the Server`

In the backend/ directory, you can run:

```bash
node main.js
```

**IMPORTANT**

1. Most node variables are environment variables stored in the .env file.

## `Cookies`

```js
// setting the session cookie
document.cookie = `session=${user.token}; max-age:${whatever} `;

//deleting the session cookie
document.cookie = `session=""; max-age=0`;
```

## `Subscription and Logging in`

## `dependencies`

1. "axios": "^1.5.1",
1. "cookie-parser": "^1.4.6",
1. "cors": "^2.8.5",
1. "dotenv": "^16.0.0",
1. "express": "^4.17.3",
1. "jsonwebtoken": "^8.5.1",
1. "mongodb": "^4.4.0",
1. "nodemailer": "^6.7.2",
1. "nodemon": "^2.0.15",

---

# `External Services`

## `MongoDB`

Database: ecom
Database name: facienda  
Collections: users, subscribers, tasks

1. **users**: each document saves the registration data of an individual user;
1. **subscribers**: saves the data of a subscriber to the newsletter (does not need to have an account or to be logged in to subscribe to the newsletter);
1. **tasks**: each document saves the tasks of registered user.

## `Mailtrap`

[mailtrap](https://mailtrap.io/) is an email delivery platform that receives submissions from the contact form.

---

# `Policies`

## `Registration Policy`

Registration policy

1. Password must contain must contain at least one uppercase character, one lowercase character, one digit, one symbol, between 16 and 128 characters and must not contain any whitespace;
1. Password will be hashed but not encrypted;
1. Username has to be unique. If it is not unique, prevent registration and inform registrant that registration has been stopped because the username has already been registered;
1. Email has to be unique. If it is not unique, prevent registration but only inform registrant that his registration has been stopped because one of his credentials has already been registered. This will protect the privacy of the email account that has already been registered;
1. If both username and email have been registered, tell registrant that the registration has been stopped because one or more of his credentials has already been registered. This will protect the privacy of the email account that has already been registered.
1. Name, Surname, Username, Email & Currency fields will each be encrypted with a secret key and a secret initVector to preserve registrant privacy in case of a database hack or leak.

---

# `A Note on Environmental Variables`

Environmental variables are disposable and do not constitute a secret. They have not been excluded so that they are available for easy testing. Users however are welcome to substitute them with their own.

---

# `Bitscope - The Bitcoin Explorer`

**Author:** Joseph Anthony Debono,  
**email:** [joe@jadebono.com](joe@jadebono.com)  
**Frontend:** [Localhost:3000](http:localhost:3000/)  
**Backend:** [Localhost:4000](http:localhost:4000/)  
**Date of commencement:** 13 October 2023  
**License:** MIT

---

# `Name and Tagline`

**Facienda** - A To-Do MERN App
_Order your life_

---

# Functionality

## `Implemented features`

## `Features not tested`

## `Main Problem`

---

# Frontend

This project was bootstrapped with:

[Create React App](https://github.com/facebook/create-react-app)  
[React Redux](https://react-redux.js.org/)  
[Redux Toolkit](https://redux-toolkit.js.org/)  
[Tailwind](https://tailwindcss.com/)

## Available Scripts

In the frontend/ directory, you can run:

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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
Database name:
Collections:

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

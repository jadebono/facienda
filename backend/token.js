// token.js
// functions to create and validate a user token

// imports
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// function to create the session token
export function signSessionToken(id) {
  return jwt.sign(
    {
      data: id,
    },
    process.env.TOKEN_KEY
  );
}

// function to verify session token
export function validateSessionToken(token) {
  try {
    jwt.verify(token, process.env.TOKEN_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

// function to decrypt the user id from the session token
export function decryptSessionToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    return decoded.data;
  } catch (error) {
    return false;
  }
}

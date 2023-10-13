"use strict";

import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// convert hex string in .env into a 32byte array
const secret_key = Buffer.from(process.env.SECRET_KEY, "hex");
const algorithm = "aes-256-cbc";

// convert hex string in .env into a 16byte array
const initVector = Buffer.from(process.env.SECRET_IV, "hex");

export function encipher(data) {
  // the cipher function
  const cipher = crypto.createCipheriv(algorithm, secret_key, initVector);
  // encrypt the message with data, input encoding and output encoding
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

export function decipher(data) {
  // the decipher function
  const decipher = crypto.createDecipheriv(algorithm, secret_key, initVector);
  // decrypt the message with data, input encoding and output encoding
  let decryptedData = decipher.update(data, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

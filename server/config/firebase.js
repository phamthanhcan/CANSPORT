const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("../cansport-95ec4-firebase-adminsdk-ek807-76fe3316c6.json");

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_NAME,
});

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};

const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("../cansport-7f03d-firebase-adminsdk-cd6bf-37d695d3d0.json");

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

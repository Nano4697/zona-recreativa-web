// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions")
const next = require("next")

var dev = process.env.NODE_ENV !== "production"
var app = next({ dev, conf: { distDir: "next" } })
var handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl) // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res))
})

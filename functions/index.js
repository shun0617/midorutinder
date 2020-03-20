const functions = 
require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.writeUrl =
functions.storage.object().onFinalize((object) => {
    const bucketName = 'project-id.appspot.com';
    const filePath = object.name;
    const name = filePath.split('.').shift();
    const db = admin.firestore();

    db.collection('people').add({
        name: name,
        url:
        `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`,
    }).then(() => console.log('Done'));
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

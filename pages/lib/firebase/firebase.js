import * as firebase from 'firebase/app'
// import "firebase/firestore";
import "firebase/auth";

export function initFirebase()
{
    const firebaseConfig = {
        apiKey: process.env.NEXT_STATIC_API_KEY,
        authDomain: process.env.NEXT_STATIC_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_STATIC_DATABASE_URL,
        projectId: process.env.NEXT_STATIC_PROJECT_ID,
        storageBucket: process.env.NEXT_STATIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_STATIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_STATIC_ID
    }
    // console.log(process.env.NEXT_STATIC_STORAGE_BUCKET)

    var r = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

    // console.log(firebase.auth.Auth.Persistence)

    return r
};

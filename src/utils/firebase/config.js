import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyC_EenzD-3AUvr0w-c_SUq7-1KG6JkOCUY",
//   authDomain: "spitface-battles-beta-si-406cc.firebaseapp.com",
//   projectId: "spitface-battles-beta-si-406cc",
//   storageBucket: "spitface-battles-beta-si-406cc.firebasestorage.app",
//   messagingSenderId: "574634506220",
//   appId: "1:574634506220:web:60b0df229b922d5dd7b2c9"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
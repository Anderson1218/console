import firebase from "firebase/app";

//auto attached to firebase
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA5IQkLsRAa4Ur_ToFPxoaa5hj0oPGthd0",
  authDomain: "an-store.firebaseapp.com",
  databaseURL: "https://an-store.firebaseio.com",
  projectId: "an-store",
  storageBucket: "",
  messagingSenderId: "267616470835",
  appId: "1:267616470835:web:392f240d23b65b24"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//always trigger the google pop-up whenever we use provider
provider.setCustomParameters({ prompt: "select_account" });

//other provider(facebook,...) can also be passed into signInWithPopup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

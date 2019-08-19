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

const provider = new firebase.auth.GoogleAuthProvider();
//always trigger the google pop-up whenever we use provider
provider.setCustomParameters({ prompt: "select_account" });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  //return userRef for future usage
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
//other provider(facebook,...) can also be passed into signInWithPopup
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

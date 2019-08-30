import firebase from "firebase/app";
//auto attached to firebase
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
//import "firebase/database";

const config = {
  apiKey: "AIzaSyA5IQkLsRAa4Ur_ToFPxoaa5hj0oPGthd0",
  authDomain: "an-store.firebaseapp.com",
  databaseURL: "https://an-store.firebaseio.com",
  projectId: "an-store",
  storageBucket: "an-store.appspot.com",
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
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  //return userRef for future usage
  return userRef;
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// export const addCollectionAndDocumnents = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = firestore.collection(collectionKey);
//   const batch = firestore.batch();
//   objectsToAdd.forEach(obj => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });
//   return await batch.commit();
// };

export const auth = firebase.auth();
export const firestore = firebase.firestore();
//other provider(facebook,...) can also be passed into signInWithPopup
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

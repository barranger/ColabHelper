import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/functions';
import firebaseConfig from './firebase.config';
import Logger from './services/loggingService';

firebase.initializeApp(firebaseConfig);

export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.app().functions('us-central1');

// Google authentication set-up
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    Logger.error('Error fetching user', error);
  }
  return null;
};

// email / password authentication set-up
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return null;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      Logger.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

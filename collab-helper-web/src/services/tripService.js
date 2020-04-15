import {firestore} from "../firebase";
import firebase from "firebase/app";


export const saveNewTrip = async (user, where, when) => {
  console.log('I have the user', user);

  if (!user) return;

  const doc = await firestore.collection('trips').add({
    uid: user.uid,
    where,
    when
  });
  return doc.id;
}

export const getTripById = async (id) => {
  
  const contactRef = firestore.doc(`trips/${id}`);
  const snapshot = await contactRef.get();
  return snapshot.data();
}

export const addItemToTrip = async (user, tripId, what) => {
  if(!user) return;

  const docRef = firestore.doc(`trips/${tripId}`);
  await docRef.update({ items: firebase.firestore.FieldValue.arrayUnion({ user, what})})
}
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseApp from "./config";

export const writeNewUser = async (username, email) => {
  try {
    const db = getFirestore(firebaseApp);
    const usersCollection = collection(db, 'beta_users');

    const userDocRef = await addDoc(usersCollection, { username, email });

    return userDocRef;
  } catch (error) {
    console.error("Error writing data to Firestore:", error);
    return null;
  }
};
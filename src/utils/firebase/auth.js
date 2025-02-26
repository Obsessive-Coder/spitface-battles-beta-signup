import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { firebaseApp } from "./config";

const auth = getAuth(firebaseApp);

export const createUser = async (username, email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user);
    return user;
};

export default auth;
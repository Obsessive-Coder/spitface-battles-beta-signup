import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification, updateProfile } from "firebase/auth";
import { firebaseApp } from "./config";

const auth = getAuth(firebaseApp);

export const createUser = async (username, email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user);
    return user;
};

export const checkEmailAvailability = async email => {
    const auth = getAuth(firebaseApp);
    try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        if (signInMethods.length > 0) {
            throw new Error('Custom: Error (auth/email-already-in-use)', { cause: { code: 'auth/email-already-in-use' }});
        }

        return true;
    } catch (error) {
        throw new Error(error.message, { cause: { ...error.cause }});
    }
};

export default auth;
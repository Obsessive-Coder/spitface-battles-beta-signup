import { firestoreDB } from "./config";
import { collection, doc, query, where, getDocs, getCountFromServer, setDoc } from "firebase/firestore";

export const checkUsernameAvailability = async username => {
    try {
        const usernamesRef = collection(firestoreDB, "reserved_usernames");
        const q = query(usernamesRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            throw new Error("Custom: Error (custom/username-already-in-use)", { cause: { code: 'custom/username-already-in-use' }});
        }

        return true;
    } catch (error) {
        throw new Error(error.message, { cause: { ...error.cause }});
    }
};

export const storeUsername = async (userId, username) => {
    if (!userId || !username) return;
    
    try {
        const userRef = doc(firestoreDB, "reserved_usernames", userId);
        await setDoc(userRef, { username });
    } catch (error) {
        throw new Error(error);
    }
};

export const getUsersCount = async () => {
    try {
        const usernamesRef = collection(firestoreDB, 'reserved_usernames');
        const usernamesSnapshot = await getCountFromServer(usernamesRef);
        return usernamesSnapshot.data().count;
    } catch (error) {
        
    }
};

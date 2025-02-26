import { firestoreDB } from "./config";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

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
        throw new Error(error);
    }
};

export const storeUsername = async (userId, username) => {
    if (!userId || !username) return;
    
    try {
        const usernamesRef = collection(firestoreDB, "reserved_usernames");
        await addDoc(usernamesRef, { userId, username });
    } catch (error) {
        throw new Error(error);
    }
};

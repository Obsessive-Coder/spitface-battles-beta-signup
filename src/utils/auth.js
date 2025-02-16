import { signUp as authSignUp } from 'aws-amplify/auth';

export const signUp = async (email, password, username) => {
    try {
        const { user } = await authSignUp({
            username: email,
            password,
            attributes: { email, username },
        });
        return user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};
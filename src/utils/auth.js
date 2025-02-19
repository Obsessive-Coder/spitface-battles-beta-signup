import { signUp as authSignUp, confirmSignUp as authConfirmSignUp } from 'aws-amplify/auth';

export const signUp = async (email, password, preferredUsername) => {
    try {
        const user = await authSignUp({
            username: preferredUsername,
            email,
            password,
            options: {
                userAttributes: {
                    email,
                    preferred_username: preferredUsername
                }
            }
        });
        return user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const confirmSignUp = async (username, code) => {
    try {
        // Call the confirmSignUp method from AWS Amplify to verify the code
        await authConfirmSignUp({ username, confirmationCode: code });
        console.log('Verification successful!');
        // You can redirect the user to login page or proceed with other actions
    } catch (error) {
        console.error('Error confirming sign up', error);
        // Handle errors (e.g., invalid code, network error)
    }
};
  
export const INVALID_CHARACTERS = ['<', '>', '\\', '`', '{', '|', '}'];

export const validateUsername = username => {
  const response = { isValid: true, message: "Valid username." };

  // Check for valid characters (letters, numbers, _.-')
  // const validCharacters = /^[a-zA-Z0-9._'-]+(?: [a-zA-Z0-9._'-]+)?$/;
  const validCharacters = /^[a-zA-Z0-9]+([a-zA-Z0-9._'-]*[a-zA-Z0-9])?( [a-zA-Z0-9._'-]+)*$/;
  if (!validCharacters.test(username)) {
    response.isValid = false;
    response.message = "Username can only contain letters, numbers, and the characters: _ . ' -";
  }

  // Check for consecutive spaces or special characters
  if (/( {2,}|[-'._]{2,})/.test(username)) {
    response.isValid = false;
    response.message = "No consecutive spaces or special characters are allowed.";
  }

  // Check length (between 3 and 22 characters)
  if (username.length < 3 || username.length > 22) {
    response.isValid = false;
    response.message = "Username must be between 3 and 22 characters.";
  }

  if (!username || username === '') {
    response.isValid = false;
    response.message = "Username is required.";
  }

  return response;
};

export const validateEmail = email => {
  const response = { isValid: true, message: "Valid email address." };

  // Regular expression for validating an email address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Check if the email matches the general pattern
  if (!emailRegex.test(email)) {
    response.isValid = false;
    response.message = "Please enter a valid email address.";
  }

  // Check if the email is too short or too long (basic limits)
  if (email.length < 5 || email.length > 100) {
    response.isValid = false;
    response.message = "Email must be between 5 and 100 characters.";
  }

  if (!email || email === '') {
    response.isValid = false;
    response.message = "Email is required.";
  }

  return response;
};

export const validatePassword = (password, confirmPassword = null) => {
  const response = { isValid: true, message: 'Valid password'};

  const isConfirmPassword = confirmPassword !== null;
  const passwordValidating = isConfirmPassword ? confirmPassword : password;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,4096}$/;

  // Check if password matches the general pattern.
  if (!passwordRegex.test(passwordValidating)) {
    response.isValid = false;
    response.message = "Please enter a valid password";
  }

  if (passwordValidating.length < 8 || passwordValidating.length > 4096) {
    response.isValid = false;
    response.message = "Password must be between 8 and 4096 characters."
  }

  if (isConfirmPassword && confirmPassword !== password) {
    response.isValid = false;
    response.message = "Passwords do not match.";
  }

  if (!passwordValidating || passwordValidating === '') {
    response.isValid = false;
    response.message = `${isConfirmPassword && 'Confirm '}Password is required.`
  }

  return response;
};

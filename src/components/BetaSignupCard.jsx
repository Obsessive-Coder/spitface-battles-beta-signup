import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

import { validateEmail, validateUsername } from '../utils';
import { createUser } from '../utils/firebase/auth';
import { checkUsernameAvailability, storeUsername } from '../utils/firebase/firestore';

const defaultFormData = {
  username: {
    value: '',
    isValid: false,
    isTouched: false,
    message: 'Username is required.'
  },
  email: {
    value: '',
    isValid: false,
    isTouched: false,
    message: 'Email is required.'
  }
};

const BetaSignupCard = ({ showAlert }) => {
  const [loading, setLoading] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [formData, setFormData] = useState({ ...defaultFormData });
  
  const {
    username: { value: usernameValue, isValid: isUsernameValid, isTouched: isUsernameTouched, message: usernameErrorMessage },
    email: { value: emailValue, isValid: isEmailValid, isTouched: isEmailTouched, message: emailErrorMessage }
  } = formData;

  const isFormValid = isUsernameValid && isEmailValid;

  const handleValidateUsername = () => {
    const usernameValidation = validateUsername(usernameValue);
    return { ...formData.username, ...usernameValidation, isTouched: isUsernameTouched };
  };

  const handleValidateEmail = () => {
    const emailValidation = validateEmail(emailValue);
    return { ...formData.email, ...emailValidation, isTouched: isEmailTouched };
  };

  const handleAddUser = debounce(async () => {
    try {
      const {
        username: { value: usernameValue},
        email: { value: emailValue }
      } = formData;

      const isUsernameAvailable = await checkUsernameAvailability(usernameValue);
      
      if (isUsernameAvailable) {
        const { uid: userId } = await createUser(usernameValue, emailValue, 'Password1!');
        await storeUsername(userId, usernameValue);
        showAlert(`Hi ${usernameValue}, We've sent a verification link to ${emailValue}. Please check your inbox and click the link to confirm your account.`, false);
      }
    } catch ({ code = '', cause, message = '', ...rest }) {
      let alertMessage = 'Unknown error please try again.';

      if (code === 'auth/email-already-in-use') {
        alertMessage = 'The provided email address is already in use.';
      } else if (cause.code === 'custom/username-already-in-use') {
        alertMessage = 'The provided username is already in use.';
      } else {
        alertMessage = message || 'There was an error creating your account. Please try again soon. If the problem persists, please contact us at support@spitfacebattles.com';
      }

      showAlert(alertMessage, false);
    }
  }, 300);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validation;

    if (name === 'username') {
      validation = handleValidateUsername();
    } else if (name === 'email') {
      validation = handleValidateEmail();
    }

    setFormData({ ...formData, [name]: { ...formData[name], ...validation, value }});
  };

  const handleBur = event => {
    const { name } = event.target;
    let validation = {};

    if (name === 'username') {
      validation = handleValidateUsername();
    } else if (name === 'email') {
      validation = handleValidateEmail();
    }
    
    setFormData({ ...formData, [name]: { ...formData[name], ...validation, isTouched: true }});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { isValid: isUsernameValid } = handleValidateUsername();
    const { isValid: isEmailValid } = handleValidateEmail();

    if (isUsernameValid && isEmailValid) {
      document.getElementById('submit').focus();
      await handleAddUser();
      setFormData({ ...defaultFormData });
      setLoading(false);
      setRefreshReCaptcha(r => !r);
    }
  };

  const onVerify = useCallback((token) => {
    setRefreshReCaptcha(token);
  });

  return (
    <Card className="rounded-0 border-0 bg-darkest secondary-card">
      <CardHeader className="text-bg-darkest rounded-0 border-0 border-bottom border-primary-orange">
        <CardTitle className="text-center fs-2 fw-bold m-0">Beta Signup</CardTitle>
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0">
        <CardText className="text-center small">
          Sign up to join our exclusive beta and experience the future of rap battles. Be among the first to build your reputation and connect with rivals worldwide.
        </CardText>

        <Form noValidate id="signup-form" onSubmit={handleSubmit}>
          <FormGroup floating>
            <Input
              required
              bsSize='sm'
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={usernameValue}
              invalid={isUsernameTouched && !isUsernameValid}
              onBlur={handleBur}
              onChange={handleChange}
              className="text-light bg-darker border-dark"
            />
            <Label for="username" className="text-secondary beta-form-label">Username</Label>
            <FormFeedback>{usernameErrorMessage}</FormFeedback>
          </FormGroup>

          <FormGroup floating>
            <Input
              required
              bsSize='sm'
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={emailValue}
              invalid={isEmailTouched && !isEmailValid}
              onBlur={handleBur}
              onChange={handleChange}
              className="text-light bg-darker border-dark"
            />
            <Label for="email" className="text-secondary beta-form-label">Email</Label>
            <FormFeedback>{emailErrorMessage}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
              <GoogleReCaptcha onVerify={onVerify} />
            </GoogleReCaptchaProvider>
          </FormGroup>

          <Button
            block
            id="submit"
            type="submit"
            size="sm"
            disabled={loading || !isFormValid}
            className="text-bg-darkest btn-outline-primary"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BetaSignupCard;

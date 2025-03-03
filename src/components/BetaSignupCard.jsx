import React, { useState, useRef } from 'react';
import debounce from 'lodash.debounce';

import ReCAPTCHA from "react-google-recaptcha";

import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

import { validateEmail, validateUsername, validatePassword } from '../utils';
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
  },
  password: {
    value: '',
    isValid: false,
    isTouched: false,
    message: 'Password is required.'
  },
  confirmPassword: {
    value: '',
    isValid: false,
    isTouched: false,
    message: 'Confirm password is required.'
  }
};

const validatorFunctions = {
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validatePassword
};

const BetaSignupCard = ({ showAlert, updateUsersCount }) => {
  const recaptchaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({ ...defaultFormData });
  
  const {
    username: { value: usernameValue, isValid: isUsernameValid, isTouched: isUsernameTouched, message: usernameErrorMessage },
    email: { value: emailValue, isValid: isEmailValid, isTouched: isEmailTouched, message: emailErrorMessage },
    password: { value: passwordValue, isValid: isPasswordValid, isTouched: isPasswordTouched, message: passwordErrorMessage },
    confirmPassword: { value: confirmPasswordValue, isValid: isConfirmPasswordValid, isTouched: isConfirmPasswordTouched, message: confirmPasswordErrorMessage }
  } = formData;

  const isTouchedData = {
    username: isUsernameTouched,
    email: isEmailTouched,
    password: isPasswordTouched,
    confirmPassword: isConfirmPasswordTouched
  };

  const isFormValid = formStep === 0 ? isUsernameValid && isEmailValid : isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  const handleValidation = (name, value) => {
    let validationFunction = validatorFunctions[name];
    const parameters = [...(name === 'confirmPassword') ? [passwordValue] : [], value];
    const validation = validationFunction(...parameters);
    return { ...formData[name], ...validation, isTouched: isTouchedData[name] };
  }; 

  const handleAddUser = debounce(async () => {
    let alertMessage = 'Unknown error please try again.';

    try {
      setIsLoading(true);
      const isUsernameAvailable = await checkUsernameAvailability(usernameValue);
      
      if (isUsernameAvailable) {
        const { uid: userId } = await createUser(usernameValue, emailValue, passwordValue);
        await storeUsername(userId, usernameValue);
        updateUsersCount();
        alertMessage = `Hi ${usernameValue}, We've sent a verification link to ${emailValue}. Please check your inbox and click the link to confirm your account.`;
      }
    } catch ({ code = '', cause, message = '' }) {
      if (code === 'auth/email-already-in-use') {
        alertMessage = 'The provided email address is already in use.';
      } else if (cause?.code === 'custom/username-already-in-use') {
        alertMessage = 'The provided username is already in use.';
      } else {
        alertMessage = message || 'There was an error creating your account. Please try again soon. If the problem persists, please contact us at support@spitfacebattles.com';
      }
    } finally {
      setIsLoading(false);
      showAlert(alertMessage, false);
    }
  }, 300);

  const handleChange = ({ target: { name, value }}) => {
    const validation = handleValidation(name, value);
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        ...validation,
        value
      }});
  };

  const handleBur = ({ target: {name, value }}) => {
    const validation = handleValidation(name, value);
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        ...validation,
        isTouched: true
      }});
  };

  const handleFormNextPrevClick = event => {
    event.preventDefault();
    const buttonId = event.currentTarget.getAttribute('id');
    const updatedFormStep = buttonId === 'previous' ? formStep - 1 : formStep + 1;
    setFormStep(updatedFormStep);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if(!recaptchaRef.current.getValue()){
      return showAlert('Please Submit Captcha.');
    }

    const formFields = ['username', 'email', 'password', 'confirmPassword'];
    const isFormValid = formFields.filter(name => !handleValidation(name, formData[name].value));

    if (isFormValid) {
      document.getElementById('submit').focus();
      setIsLoading(true);
      await handleAddUser();
      setIsLoading(false);
      setFormData({ ...defaultFormData });
    }
  };

  return (
    <Card className="rounded-0 border-0 bg-darkest order-1 order-lg-0 secondary-card">
      <CardHeader className="text-bg-darkest rounded-0 border-0 border-bottom border-primary-orange">
        <CardTitle className="text-center fs-2 fw-bold m-0">Beta Signup</CardTitle>
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0">
        <CardText className="text-center small">
          Sign up to join our exclusive beta and experience the future of rap battles. Be among the first to build your reputation and connect with rivals worldwide.
        </CardText>

        <Form noValidate id="signup-form" onSubmit={handleSubmit}>
          {formStep === 0 && (
            <>
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
            </>
          )}

          {formStep === 1 && (
            <>
              <FormGroup floating>
                <Input
                  required
                  bsSize='sm'
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={passwordValue}
                  invalid={isPasswordTouched && !isPasswordValid}
                  onBlur={handleBur}
                  onChange={handleChange}
                  className="text-light bg-darker border-dark"
                />
                <Label for="password" className="text-secondary beta-form-label">Password</Label>
                <FormFeedback>{passwordErrorMessage}</FormFeedback>
              </FormGroup>

              <FormGroup floating>
                <Input
                  required
                  bsSize='sm'
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPasswordValue}
                  invalid={isConfirmPasswordTouched && !isConfirmPasswordValid}
                  onBlur={handleBur}
                  onChange={handleChange}
                  className="text-light bg-darker border-dark"
                />
                <Label for="confirmPassword" className="text-secondary beta-form-label">Confirm Password</Label>
                <FormFeedback>{confirmPasswordErrorMessage}</FormFeedback>
              </FormGroup>

              <FormGroup className="d-flex justify-content-center">
                <ReCAPTCHA 
                  theme="dark"
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={recaptchaRef}
                />
              </FormGroup>
            </>
          )}

            <div className="d-flex">
              <Button
                block
                id={formStep === 0 ? 'next' : 'previous'}
                name={formStep === 0 ? 'next' : 'previous'}
                type='button'
                size="sm"
                disabled={formStep === 0 && !isFormValid}
                onClick={handleFormNextPrevClick}
                className={`text-bg-darkest btn-outline-primary ${formStep > 0 && 'flex-basis-0 me-3'}`}
              >
                {formStep === 0 ? 'Next' : 'Previous'}
              </Button>

              {formStep === 1 && (
                <Button
                  block
                  id="submit"
                  type='submit'
                  size="sm"
                  disabled={isLoading || !isFormValid}
                  className="flex-fill text-bg-darkest btn-outline-primary"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BetaSignupCard;

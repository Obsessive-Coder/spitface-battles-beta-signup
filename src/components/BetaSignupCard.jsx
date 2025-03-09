import React, { useState, useRef } from 'react';
import debounce from 'lodash.debounce';

import ReCAPTCHA from "react-google-recaptcha";

import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

import { motion, AnimatePresence } from 'motion/react';

import { validateEmail, validateUsername, validatePassword } from '../utils';
import { createUser, checkEmailAvailability } from '../utils/firebase/auth';
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

  const isFormValid = formStep === 0 ? isUsernameValid && isEmailValid : isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  const handleValidation = (name, value) => {
    let validationFunction = validatorFunctions[name];
    const parameters = [...(name === 'confirmPassword') ? [passwordValue] : [], value];
    const validation = validationFunction(...parameters);
    return { ...formData[name], ...validation, isTouched: formData[name].isTouched };
  }; 

  const handleAddUser = debounce(async () => {
    let alertMessage = 'Unknown error please try again.';

    try {
      const {
        username: { value: usernameValue },
        email: { value: emailValue },
        password: { value: passwordValue },
      } = formData;
      setIsLoading(true);
      const isUsernameAvailable = await checkUsernameAvailability(usernameValue);
      const isEmailAvailable = await checkEmailAvailability(emailValue);
      
      if (isUsernameAvailable && isEmailAvailable) {
        const { uid: userId } = await createUser(usernameValue, emailValue, passwordValue);
        await storeUsername(userId, usernameValue);
        updateUsersCount();
        alertMessage = `Hi ${usernameValue}, We've sent a verification link to ${emailValue}. Please check your inbox and click the link to confirm your account.`;
      }
    } catch ({ code = '', cause, message = '' }) {
      if (code === 'auth/email-already-in-use' || cause?.code === 'custom/email-already-in-use') {
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

  const handleBur = async ({ target: {name, value }}) => {
    let validation = handleValidation(name, value);

    try {
      if (name === 'username') {
        setIsLoading(true);
        await checkUsernameAvailability(value);
      }
      
      if (name === 'email') {
        setIsLoading(true);
        await checkEmailAvailability(value);
      } 
    } catch ({ code = '', cause, message: errorMessage }) {
      let message = errorMessage;
      if (code === 'auth/email-already-in-use' || cause?.code === 'auth/email-already-in-use') {
        message = 'The provided email address is already in use.';
        validation = { ...validation, message, isValid: false };
      } else if (cause?.code === 'custom/username-already-in-use') {
        message = 'The provided username is already in use.';
        validation = { ...validation, message, isValid: false };
      }
    }finally {
      setIsLoading(false);

      setFormData({
        ...formData,
        [name]: {
          ...formData[name],
          ...validation,
          isTouched: true
        }});
    }
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
    <Card className="rounded-0 border-0 bg-darkest secondary-card">
      <CardHeader className="text-bg-darkest rounded-0 border-0 border-bottom border-primary-orange">
        <CardTitle className="text-center fs-1 fw-bold m-0 text-primary-orange-emphasis londrina-outline-regular">Beta Signup</CardTitle>
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0">
        <CardText className="text-center fw-bold text-secondary annie-use-your-telescope-regular" style={{ letterSpacing: '1px' }}>
          Secure your spot, build your rep, and run the mic.
        </CardText>

        <motion.div layout>
        <Form noValidate id="signup-form" onSubmit={handleSubmit} className='permanent-marker-regular'>
          <AnimatePresence mode="wait">
            {formStep === 0 && (
              <motion.div initial="hidden" animate="visible" exit="hidden">
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
                    tabIndex={1}
                    onBlur={handleBur}
                    onChange={handleChange}
                    style={{ letterSpacing: '5px' }}
                    className="text-light text-light-emphasis bg-darker border-dark"
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
                    tabIndex={2}
                    onBlur={handleBur}
                    onChange={handleChange}
                    style={{ letterSpacing: '5px' }}
                    className="text-light text-light-emphasis bg-darker border-dark"
                  />
                  <Label for="email" className="text-secondary beta-form-label">Email</Label>
                  <FormFeedback>{emailErrorMessage}</FormFeedback>
                </FormGroup>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {formStep === 1 && (
              <motion.div initial="hidden" animate="visible" exit="hidden">
                <FormGroup floating>
                  <Input
                    required
                    autoFocus
                    bsSize='sm'
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    value={passwordValue}
                    invalid={isPasswordTouched && !isPasswordValid}
                    tabIndex={1}
                    onBlur={handleBur}
                    onChange={handleChange}
                    style={{ letterSpacing: '5px' }}
                    className="text-light text-light-emphasis bg-darker border-dark"
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
                    tabIndex={2}
                    onBlur={handleBur}
                    onChange={handleChange}
                    style={{ letterSpacing: '5px' }}
                    className="text-light text-light-emphasis bg-darker border-dark"
                  />
                  <Label for="confirmPassword" className="text-secondary beta-form-label">Confirm Password</Label>
                  <FormFeedback>{confirmPasswordErrorMessage}</FormFeedback>
                </FormGroup>

                <motion.div initial="hidden" animate="visible" exit="hidden">
                  <FormGroup className="d-flex justify-content-center">
                    <ReCAPTCHA 
                      theme="dark"
                      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={recaptchaRef}
                    />
                  </FormGroup>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

            <div className="d-flex">
              <Button
                block
                id={formStep === 0 ? 'next' : 'previous'}
                name={formStep === 0 ? 'next' : 'previous'}
                type='button'
                size="sm"
                tabIndex={formStep === 0 ? 3 : 4}
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
                  tabIndex={3}

                  disabled={isLoading || !isFormValid}
                  className="flex-fill text-bg-darkest btn-outline-primary"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </div>
        </Form>
        </motion.div>
      </CardBody>
    </Card>
  );
};

export default BetaSignupCard;

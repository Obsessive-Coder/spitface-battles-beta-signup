import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

import { validateEmail, validateUsername } from '../utils';
import { createUser } from '../utils/firebase/auth';
import { checkUsernameAvailability, storeUsername } from '../utils/firebase/firestore';

const BetaSignupCard = ({ showAlert }) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [validation, setValidation] = useState({
    username: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
  });

  const handleValidateUsername = () => {
    const usernameValidation = validateUsername(formData.username);
    setValidation({
      ...validation,
      username: { ...usernameValidation }
    });
  };

  const handleValidateEmail = () => {
    const emailValidation = validateEmail(formData.email);
    setValidation({
      ...validation,
      email: { ...emailValidation }
    });
  };

  const handleAddUser = debounce(async () => {
    try {
      const { email, username } = formData;
      const isUsernameAvailable = await checkUsernameAvailability(username);
      
      if (isUsernameAvailable) {
        await createUser(username, email, 'Password1!');
        await storeUsername(username);
        showAlert(`Hi ${username}, We've sent a verification link to ${email}. Please check your inbox and click the link to confirm your account.`, false);
      }
    } catch ({ code = '', message = '' }) {
      let alertMessage = 'Unknown error please try again.';

      if (code === 'auth/email-already-in-use') {
        alertMessage = 'The provided email address is already in use.';
      } else if (code === 'custom/username-already-in-use') {
        alertMessage = 'The provided username is already in use.';
      } else {
        alertMessage = message || 'There was an error creating your account. Please try again soon. If the problem persists, please contact us at support@spitfacebattles.com';
      }

      showAlert(alertMessage, false);
    }
  }, 300);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset validation feedback when user starts editing
    // setValidation({ ...validation, [name]: { isValid: true, message: '' } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // Perform final validation checks
    handleValidateUsername();
    handleValidateEmail();

    // If either field is invalid, prevent form submission
    if (!validation.username.isValid || !validation.email.isValid) {
      alert()
      setLoading(false);
      console.log('Form submission blocked due to validation errors.');
      return;
    }

    // Proceed with form submission if both fields are valid
    handleAddUser();
    setLoading(false);
    setFormData({ username: '', email: ''});
    setRefreshReCaptcha(r => !r);
  };

  const onVerify = useCallback((token) => {
    // setToken(token);
    // console.log(token)
  });

  const isFormValid = validation.username.isValid && validation.email.isValid;

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
              value={formData.username}
              invalid={!validation.username.isValid}
              onBlur={handleValidateUsername}
              onChange={handleChange}
              className="text-light bg-darker border-dark"
            />
            <Label for="username" className="text-secondary beta-form-label">Username</Label>
            <FormFeedback>{validation.username.message}</FormFeedback>
          </FormGroup>

          <FormGroup floating>
            <Input
              required
              bsSize='sm'
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              invalid={!validation.email.isValid}
              onBlur={handleValidateEmail}
              onChange={handleChange}
              className="text-light bg-darker border-dark"
            />
            <Label for="email" className="text-secondary beta-form-label">Email</Label>
            <FormFeedback>{validation.email.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
              <GoogleReCaptcha onVerify={onVerify} />
            </GoogleReCaptchaProvider>
          </FormGroup>

          <Button
            block
            type="submit"
            size="sm"
            disabled={loading}
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

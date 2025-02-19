import React, { useState } from 'react';
import debounce from 'lodash.debounce';

import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

import { validateEmail, validateUsername } from '../utils';

const BetaSignupCard = ({ showAlert }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: 'Password1!'
  });

  const [validation, setValidation] = useState({
    username: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    password: { isValid: true, message: '' }
  });

  const handleValidateUsername = () => {
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      setValidation({
        ...validation,
        username: { ...usernameValidation }
      });
    } else {
      // handleUsernameCheck();
    }    
  };

  const handleValidateEmail = () => {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setValidation({
        ...validation,
        email: { ...emailValidation }
      });
    } else {
      // handleEmailCheck();
    }
  };

  const handleAddUser = debounce(async () => {
    try {
      const { email, username, password } = formData;
      // await signUp(email, password, username);
      // showAlert(username, email, `Hi ${username},\nPlease enter the verification code sent to ${email}.`, true);
    } catch (error) {
      alert(error.message);
    }
  }, 300);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset validation feedback when user starts editing
    setValidation({ ...validation, [name]: { isValid: true, message: '' } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Perform final validation checks
    await handleValidateUsername();
    await handleValidateEmail();

    // If either field is invalid, prevent form submission
    if (!validation.username.isValid || !validation.email.isValid) {
      setLoading(false);
      console.log('Form submission blocked due to validation errors.');
      return;
    }

    // Proceed with form submission if both fields are valid
    handleAddUser();
    setLoading(false);
    setFormData({ username: '', email: '', password: 'Password1!' })
  };

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

        <Form id="signup-form" onSubmit={handleSubmit}>
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

          <Button block type="submit" size="sm" disabled={loading || !isFormValid} className="text-bg-darkest btn-outline-primary">
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BetaSignupCard;

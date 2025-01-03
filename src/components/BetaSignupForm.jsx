import React, { useState } from 'react';
import debounce from 'lodash.debounce';

import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

import api from '../utils';

const BetaSignupForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [validation, setValidation] = useState({
    username: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
  });

  const handleUsernameCheck = debounce(async () => {
    try {
      const isTaken = await api.checkUsername(formData.username);
      if (isTaken) {
        setValidation({
          ...validation,
          username: { isValid: false, message: 'Username is already taken.' },
        });
      } else {
        setValidation({
          ...validation,
          username: { isValid: true, message: '' },
        });
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setValidation({
        ...validation,
        username: { isValid: false, message: 'Error validating username.' },
      });
    }
  }, 300);

  const handleEmailCheck = debounce(async () => {
    try {
      const isTaken = await api.checkEmail(formData.email);
      if (isTaken) {
        setValidation({
          ...validation,
          email: { isValid: false, message: 'Email is already taken.' },
        });
      } else {
        setValidation({
          ...validation,
          email: { isValid: true, message: '' },
        });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setValidation({
        ...validation,
        email: { isValid: false, message: 'Error validating email.' },
      });
    }
  }, 300);

  const handleAddUser = debounce(async () => {
    try {
      const newUser = await api.addUser(formData.username, formData.email);
      console.log('User successfully added:', newUser);
    } catch (error) {
      console.error('Failed to add user:', error);
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
    await handleUsernameCheck();
    await handleEmailCheck();

    // If either field is invalid, prevent form submission
    if (!validation.username.isValid || !validation.email.isValid) {
      setLoading(false);
      console.log('Form submission blocked due to validation errors.');
      return;
    }

    // Proceed with form submission if both fields are valid
    handleAddUser();
    setLoading(false);
  };

  const isFormValid = validation.username.isValid && validation.email.isValid;

  return (
    <Card className="border-0 rounded-0 shadow-lg">
      <CardHeader className="border-0 p-0 rounded-top-0 text-bg-darkest">
        <CardTitle className="text-center fs-2 m-0">Beta Signup</CardTitle>
      </CardHeader>

      <CardBody className="bg-secondary-subtle rounded-bottom-0">
        <CardText className="text-center small">
          Sign up to join our exclusive beta and experience the future of rap battles. Be among the first to build your reputation and connect with rivals worldwide.
        </CardText>

        <Form id="signup-form" onSubmit={handleSubmit}>
          <FormGroup floating>
            <Input
              required
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={formData.username}
              invalid={!validation.username.isValid}
              onBlur={handleUsernameCheck}
              onChange={handleChange}
              className="bg-body-tertiary"
            />
            <Label for="username">Username</Label>
            <FormFeedback>{validation.username.message}</FormFeedback>
          </FormGroup>

          <FormGroup floating>
            <Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              invalid={!validation.email.isValid}
              onBlur={handleEmailCheck}
              onChange={handleChange}
              className="bg-body-tertiary"
            />
            <Label for="email">Email</Label>
            <FormFeedback>{validation.email.message}</FormFeedback>
          </FormGroup>

          <Button block type="submit" size="sm" disabled={loading || !isFormValid} className="text-bg-darkest">
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BetaSignupForm;

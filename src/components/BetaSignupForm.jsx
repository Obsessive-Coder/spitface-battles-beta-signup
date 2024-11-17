import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const BetaSignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    accessCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic
    console.log('Form submitted:', formData);
  };

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
              onChange={handleChange}
              className="bg-body-tertiary"
            />
            <Label for="username">Username</Label>
          </FormGroup>

          <FormGroup floating>
            <Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="bg-body-tertiary"
            />
            <Label for="email">Email</Label>
          </FormGroup>

          {/* <FormGroup floating>
            <Input
              required
              type="text"
              name="accessCode"
              id="accessCode"
              placeholder="Enter beta access code"
              value={formData.accessCode}
              onChange={handleChange}
              className="bg-body-tertiary"
            />
            <Label for="accessCode">Access Code</Label>
          </FormGroup> */}

          <Button block type="submit" size="sm" className="text-bg-darkest">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default BetaSignupForm;

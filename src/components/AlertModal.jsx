import React, { useState } from 'react';

// Components.
import { Button, Form, FormGroup, FormFeedback, Label, Modal, ModalBody, ModalFooter } from 'reactstrap';
import VerificationInput from 'react-verification-input';

// Font Awesome icons.
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AlertModal({ alertConfig = {}, confirmButtonProps = {}, handleConfirmSuccess = () => null, handleCloseOnClick = () => null }) {
  const [verificationCode, setVerificationCode] = useState('');

  const { isOpen = false, message = '', isConfirm = false } = alertConfig;

  const handleVerificationCodeChange = code => {
    const codeRegex = /^\d{0,6}$/;

    if (codeRegex.test(code) && code !== verificationCode) {
      setVerificationCode(code);
    }
  };

  const validateVerificationCode = async event => {
    event.preventDefault();
    // console.log('Validate Code: ', event);

    try {
        // await confirmSignUp(username, verificationCode);
        // handleConfirmSuccess()
        // Handle success (redirect, success message, etc.)
    } catch (error) {
        console.error('Error confirming sign up', error);
        // Handle error (e.g., invalid code message)
    }
};

  return(
    <Modal
      backdrop
      isOpen={isOpen}
      contentClassName="bg-darkest rounded-0"
    >
      <div className="d-flex justify-content-between p-2 border-primary-orange rounded-0 bg-darkest modal-header" >
        <h3 className="flex-fill m-0">
          ALERT
        </h3>
        <Button
          close
          onClick={handleCloseOnClick}
          className="p-0 m-1 text-danger close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>

      <ModalBody className="d-flex flex-column justify-content-around p-3 bg-darkest alert-body">
        {typeof message === 'string' ? (
          message.split('\n').map((textLine, index) => (
            <p
              key={textLine + index}
              className={`m-0 ${textLine.includes('WARNING') ? 'text-sm text-danger' : ''} ${textLine.includes('INFO') ? 'text-sm text-info' : ''}`}
            >
              {textLine}
            </p>
          ))
        ) : JSON.stringify(message)}

        {isConfirm && (
          <Form 
            id="verify-form"
            onSubmit={validateVerificationCode}
            className="mx-auto"
            // style={{ height: 60 }}
          >
            <FormGroup className="my-3 mx-2">
                <VerificationInput autoFocus
                  validChars="0-9"
                  placeholder=" "
                  onChange={handleVerificationCodeChange}
                  inputProps={{
                    id: 'verification-code',
                    autoComplete: false,
                    required: true,
                    inputMode: 'numeric',
                    value: verificationCode,
                  }}
                  classNames={{ character: 'verification-code-character' }}
                />
                
                {/* <Input
                  required
                  bsSize='sm'
                  type="text"
                  id={`verification-code-${index}`}
                  value={codeDigitValue}
                  max={1}
                  data-index={index}
                  // invalid={!isVerificationCodeValid}
                  // onBlur={handleValidateVerificationCode}
                  onChange={handleVerificationCodeChange}
                  className="text-light text-center bg-darker border-dark rounded-0 fw-bold h-100"
                  style={{ width: 60, fontSize: '22pt' }}
                /> */}
                {/* <Label for="verification-code" className="text-secondary beta-form-label">Verification Code</Label> */}
                {/* <FormFeedback>{validation.verificationCode.message}</FormFeedback> */}
              </FormGroup>
          </Form>
        )}
      </ModalBody>

      <ModalFooter className="p-0 border-top-0">
        <Button
          outline
          size="md"
          id="close"
          onClick={handleCloseOnClick}
          className={`m-0 px-5 rounded-0 ${isConfirm ? 'btn-outline-secondary' : 'btn-outline-primary'}`}
        >
          {isConfirm ? 'Cancel' : 'Close'}
        </Button>
        {isConfirm && (
          <Button
            outline
            size="md"
            id="confirm"
            form="verify-form"
            {...confirmButtonProps}
            className="btn-outline-primary m-0 px-5 rounded-0 alert-confirm"
          >
            Confirm
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
}

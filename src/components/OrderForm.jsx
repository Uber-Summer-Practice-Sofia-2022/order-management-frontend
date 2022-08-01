import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';

export default function OrderForm({ values, setValues, onSubmit }) {
  const handleNameChange = (event) => setValues({
    ...values,
    CustomerName: event.target.value,
  });

  const handleAddressChange = (event) => setValues({
    ...values,
    DeliveryAddress: event.target.value,
  });

  const handlePhoneChange = (event) => setValues({
    ...values,
    PhoneNumber: event.target.value,
  });

  const handleAdditionalInfoChange = (event) => setValues({
    ...values,
    additionalInfo: event.target.value,
  });

  const handleCutleryButtonChange = (event) => setValues({
    ...values,
    cutlery: event.target.value,
  });

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    >
      <Form.Group className="mb-3" controlId="formCutlery">
        <Form.Check
          onChange={handleCutleryButtonChange}
          name="Cutlery"
          type="checkbox"
          id="Cutlery"
          label="Cutlery"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formName">
        <FloatingLabel label="Name">
          <Form.Control required type="text" placeholder="Enter name" value={values.CustomerName} onChange={handleNameChange} />
        </FloatingLabel>
        <Form.Text className="text-muted">
          Please fill in your name
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDeliveryAddress">
        <FloatingLabel label="Delivery Address">
          <Form.Control required type="text" placeholder="Enter delivery address" value={values.DeliveryAddress} onChange={handleAddressChange} />
        </FloatingLabel>
        <Form.Text className="text-muted">
          Please fill in your address.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoneNumber">
        <FloatingLabel label="Phone Number">
          <Form.Control
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            placeholder="Enter phone number"
            value={values.PhoneNumber}
            onChange={handlePhoneChange}
          />
        </FloatingLabel>
        <Form.Text className="text-muted">
          Phone number format must be XXX-XXX-XXXX
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAdditionalInfo">
        <FloatingLabel label="Additional Info">
          <Form.Control required type="textarea" placeholder="Enter additional info" value={values.additionalInfo} onChange={handleAdditionalInfoChange} />
        </FloatingLabel>
        <Form.Text className="text-muted">
          Please fill in your preferences.
        </Form.Text>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
      >
        Submit Order
      </Button>
    </Form>
  );
}

OrderForm.propTypes = {
  values: PropTypes.object,
  setValues: PropTypes.func,
  onSubmit: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal,
} from 'react-bootstrap';

export default function CancelModal(props) {
  return (
    <Modal show={props.visible} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your order was cancelled</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CancelModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

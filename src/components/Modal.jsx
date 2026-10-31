import React from 'react';
import { Modal as RBModal, Button } from 'react-bootstrap';
export default function Modal({ show, onHide, title, children, onConfirm }) {
  return (
    <RBModal show={show} onHide={onHide} centered>
      <RBModal.Header closeButton>
        <RBModal.Title>{title}</RBModal.Title>
      </RBModal.Header>
      <RBModal.Body>{children}</RBModal.Body>
      <RBModal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        {onConfirm && <Button variant="primary" onClick={onConfirm}>Confirm</Button>}
      </RBModal.Footer>
    </RBModal>
  );
}

import React from 'react';
import { Spinner } from 'react-bootstrap';
export default function Loader() {
  return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

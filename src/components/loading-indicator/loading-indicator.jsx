import React from 'react';
import { Spinner } from 'react-bootstrap';
import './loading-indicator.scss';

const LoadingIndicator = () => (
  <div className="loading-indicator">
    <Spinner animation="border" variant="primary" />
  </div>
);

export default LoadingIndicator;

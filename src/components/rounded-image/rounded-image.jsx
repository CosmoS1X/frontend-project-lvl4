import React from 'react';

const RoundedImage = ({ image, alt }) => (
  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
    <img src={image} className="rounded-circle" alt={alt} />
  </div>
);

export default RoundedImage;

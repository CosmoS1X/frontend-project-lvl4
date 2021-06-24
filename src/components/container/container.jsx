import React from 'react';

const Container = ({ children }) => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        {children}
      </div>
    </div>
  </div>
);

export default Container;

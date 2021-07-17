import React from 'react';
import SignupForm from '../components/signup-form';
import signupIcon from './signup-icon.jpeg';

const SignUpPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src={signupIcon} className="rounded-circle" alt="Регистрация" />
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUpPage;

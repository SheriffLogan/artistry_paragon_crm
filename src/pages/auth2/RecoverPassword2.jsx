import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout2 from './AuthLayout2';
import { FormInput, VerticalForm } from '../../components';
import { forgotPassword } from '../../helpers/api/auth';

const BottomLink = () => (
  <footer className="text-center justify-center h-14 -mb-12">
    Back to{' '}
    <Link to="/auth/login2" className="text-muted ms-1 link-offset-3 underline-offset-4">
      <b>Log In</b>
    </Link>
  </footer>
);

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('Please enter your email'),
});

const RecoverPassword2 = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (formData) => {
    try {
      await forgotPassword({ email: formData.email });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Unable to send reset link');
    }
  };

  return (
    <AuthLayout2
      title="Reset Password"
      helpText="Enter your email address and we'll send you instructions to reset your password."
      bottomLinks={<BottomLink />}
    >
      {submitted ? (
        <p className="text-center text-green-600">
          If that email exists in our system, you’ll receive a reset link shortly.
        </p>
      ) : (
        <>
          {error && <p className="text-center text-red-600 mb-4">{error}</p>}
          <VerticalForm
            onSubmit={onSubmit}
            resolver={yupResolver(schema)}
            defaultValues={{ email: '' }}
          >
            <FormInput
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="form-input"
              labelClassName="font-semibold text-gray-500"
              containerClass="mb-6 space-y-2"
              required
            />
            <div className="text-center">
              <button className="btn bg-primary text-white w-full" type="submit">
                Reset Password
              </button>
            </div>
          </VerticalForm>
        </>
      )}
    </AuthLayout2>
  );
};

export default RecoverPassword2;

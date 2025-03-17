import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  website: yup.string().url('Invalid URL').required('Website is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Repeat Password is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
});

const SignupForm: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      // Send data to Zapier webhook
      const response = await fetch('https://hooks.zapier.com/hooks/catch/your-webhook-url/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setSubmissionError(false);
      } else {
        setSubmissionError(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionError(true);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 10000); // Redirect after 10 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isSubmitted]);

  if (isSubmitted) {
    return (
      <div className="thank-you-message">
        <h3>Thank you for signing up! We will get back to you shortly.</h3>
        <p>You will be redirected to the homepage in 10 seconds.</p>
      </div>
    );
  }

  return (
    <section className="signup py-5">
      <div className="container d-flex flex-column align-items-center">
        <h3 className="text-center mb-5">Create Your Paytriot Account</h3>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label label-form">
              Full Name
            </label>
            <input
              type="text"
              className={`form-control form-field ${errors.fullName ? 'is-invalid' : ''}`}
              {...register('fullName')}
              id="fullName"
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label label-form">
              Email
            </label>
            <input
              type="email"
              className={`form-control form-field ${errors.email ? 'is-invalid' : ''}`}
              {...register('email')}
              id="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="website" className="form-label label-form">
              Website
            </label>
            <input
              type="url"
              className={`form-control form-field ${errors.website ? 'is-invalid' : ''}`}
              {...register('website')}
              id="website"
            />
            {errors.website && <div className="invalid-feedback">{errors.website.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label label-form">
              Password
            </label>
            <input
              type="password"
              className={`form-control form-field ${errors.password ? 'is-invalid' : ''}`}
              {...register('password')}
              id="password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label label-form">
              Repeat Password
            </label>
            <input
              type="password"
              className={`form-control form-field ${errors.repeatPassword ? 'is-invalid' : ''}`}
              {...register('repeatPassword')}
              id="repeatPassword"
            />
            {errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword.message}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label label-form">
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={'us'}
                  inputClass={`form-control form-field ${errors.phoneNumber ? 'is-invalid' : ''}`}
                />
              )}
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
          </div>
          {submissionError && (
            <div className="alert alert-danger" role="alert">
              Form submission failed. Please try again.
            </div>
          )}
          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-primary w-100 mb-4"
              style={{ backgroundColor: '#F26A2E', border: 'none' }}
            >
              Sign Up
            </button>
            <label className="label-account">
             
::contentReference[oaicite:0]{index=0}
 

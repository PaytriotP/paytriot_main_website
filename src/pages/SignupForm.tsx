import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, Loading } from '@nextui-org/react';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  website: yup.string().url('Invalid URL').required('Website is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Repeat Password is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
});

const SignupForm: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema),
  });
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setSubmissionError(null);
    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/15891653/2lq4i5f/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmissionError(error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 10000); // Redirect after 10 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isSubmitSuccessful]);

  return (
    <section className="signup py-5">
      <div className="container d-flex flex-column align-items-center">
        <h3 className="text-center mb-5">Create Your Paytriot Account</h3>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <Input
            rounded
            className="my-2"
            size="lg"
            type="text"
            label="Full Name"
            {...register('fullName')}
            status={errors.fullName ? 'error' : undefined}
            fullWidth
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="email"
            label="Email"
            {...register('email')}
            status={errors.email ? 'error' : undefined}
            fullWidth
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="url"
            label="Website"
            {...register('website')}
            status={errors.website ? 'error' : undefined}
            fullWidth
          />
          {errors.website && <div className="invalid-feedback">{errors.website.message}</div>}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="password"
            label="Password"
            {...register('password')}
            status={errors.password ? 'error' : undefined}
            fullWidth
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="password"
            label="Repeat Password"
            {...register('repeatPassword')}
            status={errors.repeatPassword ? 'error' : undefined}
            fullWidth
          />
          {errors.repeatPassword && <div className="invalid-feedback">{errors.repeatPassword.message}</div>}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="tel"
            label="Phone Number"
            {...register('phoneNumber')}
            status={errors.phoneNumber ? 'error' : undefined}
            fullWidth
          />
          {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}

          {submissionError && (
            <div className="alert alert-danger" role="alert">
              {submissionError}
            </div>
          )}

          {isSubmitSuccessful && (
            <div className="alert alert-success" role="alert">
              Thank you for signing up! We will get back to you shortly. You will be redirected to the homepage in 10 seconds.
            </div>
          )}

          <div className="d-flex flex-column align-items-center">
            <Button
              rounded
              size="xl"
              color="warning"
              type="submit"
              disabled={isSubmitting}
              className="w-100 mb-4"
            >
              {!isSubmitting ? 'Sign Up' : <Loading color="currentColor" size="md" />}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;

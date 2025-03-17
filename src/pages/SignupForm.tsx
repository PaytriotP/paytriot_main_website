import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, Loading } from '@nextui-org/react';

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset
  } = useForm();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setSubmissionError(null);
    try {
      // Basic validation manually
      if (data.password !== data.repeatPassword) {
        setSubmissionError("Passwords do not match");
        return;
      }

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
      reset();
    } catch (error: any) {
      setSubmissionError(error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 10000);
      return () => clearTimeout(timer);
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
            {...register('fullName', { required: 'Full Name is required' })}
            status={errors.fullName ? 'error' : undefined}
            fullWidth
          />
          {errors.fullName?.message && (
            <div className="invalid-feedback">{errors.fullName.message as string}</div>
          )}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="email"
            label="Email"
            {...register('email', { required: 'Email is required' })}
            status={errors.email ? 'error' : undefined}
            fullWidth
          />
          {errors.email?.message && (
            <div className="invalid-feedback">{errors.email.message as string}</div>
          )}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="url"
            label="Website"
            {...register('website', { required: 'Website is required' })}
            status={errors.website ? 'error' : undefined}
            fullWidth
          />
          {errors.website?.message && (
            <div className="invalid-feedback">{errors.website.message as string}</div>
          )}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="password"
            label="Password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            status={errors.password ? 'error' : undefined}
            fullWidth
          />
          {errors.password?.message && (
            <div className="invalid-feedback">{errors.password.message as string}</div>
          )}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="password"
            label="Repeat Password"
            {...register('repeatPassword', { required: 'Repeat Password is required' })}
            status={errors.repeatPassword ? 'error' : undefined}
            fullWidth
          />
          {errors.repeatPassword?.message && (
            <div className="invalid-feedback">{errors.repeatPassword.message as string}</div>
          )}

          <Input
            rounded
            className="my-2"
            size="lg"
            type="tel"
            label="Phone Number"
            {...register('phoneNumber', { required: 'Phone Number is required' })}
            status={errors.phoneNumber ? 'error' : undefined}
            fullWidth
          />
          {errors.phoneNumber?.message && (
            <div className="invalid-feedback">{errors.phoneNumber.message as string}</div>
          )}

          {submissionError && (
            <div className="alert alert-danger" role="alert">
              {submissionError}
            </div>
          )}

          {isSubmitSuccessful && (
            <div className="alert alert-success" role="alert">
              Thank you for signing up! You will be redirected to the homepage in 10 seconds.
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

import React, { useRef } from 'react';

const SignupForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      try {
        const response = await fetch('https://script.google.com/a/macros/paytriot.co.uk/s/AKfycbw_AQeP-B5V1bzouImJoYbxuw2bVeCkI_tpZivqXCipeKzRPy7PSVE2gR5LjgAKmjdp/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Form submitted successfully!');
          formRef.current.reset();
        } else {
          alert('Form submission failed.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred during form submission.');
      }
    }
  };

  return (
    <section className="signup py-5">
      <div className="container d-flex flex-column align-items-center">
        <h3 className="text-center mb-5">Create Your Paytriot Account</h3>
        <form ref={formRef} className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label label-form">
              Full Name
            </label>
            <input
              type="text"
              className="form-control form-field"
              name="Full Name"
              id="fullName"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label label-form">
              Email
            </label>
            <input
              type="email"
              className="form-control form-field"
              name="Email"
              id="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="website" className="form-label label-form">
              Website
            </label>
            <input
              type="url"
              className="form-control form-field"
              name="Website"
              id="website"
              defaultValue="http://"
              pattern="https?://.+"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label label-form">
              Password
            </label>
            <input
              type="password"
              className="form-control form-field"
              name="Password"
              id="password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label label-form">
              Repeat Password
            </label>
            <input
              type="password"
              className="form-control form-field"
              name="Repeat Password"
              id="repeatPassword"
              required
            />
          </div>

          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-primary w-100 mb-4"
              style={{ backgroundColor: '#F26A2E', border: 'none' }}
            >
              Sign Up
            </button>
            <label className="label-account">
              Already have an account? <a href="/signin">Login</a>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;

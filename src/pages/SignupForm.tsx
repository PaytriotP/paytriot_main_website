"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Input, Button, Loading } from "@nextui-org/react"

// Form field type
type FormValues = {
  fullName: string
  email: string
  website: string
  password: string
  repeatPassword: string
  phoneNumber: string
}

export default function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError: setFormError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      website: "",
      password: "",
      repeatPassword: "",
      phoneNumber: "",
    },
  })

  const password = watch("password")
  const repeatPassword = watch("repeatPassword")

  // Check if passwords match
  useEffect(() => {
    if (repeatPassword && password !== repeatPassword) {
      setFormError("repeatPassword", {
        type: "manual",
        message: "Passwords don't match",
      })
    } else if (repeatPassword) {
      clearErrors("repeatPassword")
    }
  }, [password, repeatPassword, setFormError, clearErrors])

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

const onSubmit = async (data: FormValues) => {
  setIsSubmitting(true);
  setSubmissionError(null);

  try {
    // Basic validation manually
    if (data.password !== data.repeatPassword) {
      setSubmissionError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("https://script.google.com/macros/s/AKfycbwGszRHnke5oeYhbulemJtRnZ8A2HsinNt4hXBSl6z9S6uags2ScCZFJmhgPGr9o1WQ/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        password: data.password,
        repeatPassword: data.repeatPassword,
      }),
    });

    setIsSuccess(true);
    reset();

    // Redirect after successful submission
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  } catch (error: any) {
    setSubmissionError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section className="signup py-5">
      <div className="container d-flex flex-column align-items-center">
        <h3 className="text-center mb-5">Create Your Paytriot Account</h3>

        {isSuccess ? (
          <div className="text-center w-100 mb-4">
            <div className="mb-3">
              <span className="text-success" style={{ fontSize: "3rem" }}>
                ✓
              </span>
            </div>
            <h4 className="text-success mb-3">Account Created Successfully!</h4>
            <p>Thank you for signing up with Paytriot. You will be redirected to the homepage in 5 seconds.</p>
          </div>
        ) : (
          <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <Input
                rounded
                className="my-2"
                size="lg"
                type="text"
                label="Full Name"
                placeholder="John Smith"
                status={errors.fullName ? "error" : undefined}
                fullWidth
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
              />
              {errors.fullName && <div className="text-danger small mt-1">{errors.fullName.message}</div>}
            </div>

            <div className="mb-3">
              <Input
                rounded
                className="my-2"
                size="lg"
                type="email"
                label="Email"
                placeholder="you@example.com"
                status={errors.email ? "error" : undefined}
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
            </div>

            <div className="mb-3">
              <Input
                rounded
                className="my-2"
                size="lg"
                type="tel"
                label="Phone Number"
                placeholder="+44 (555) 123-4567"
                status={errors.phoneNumber ? "error" : undefined}
                fullWidth
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  minLength: {
                    value: 5,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phoneNumber && <div className="text-danger small mt-1">{errors.phoneNumber.message}</div>}
            </div>

            <div className="mb-3">
              <Input
                rounded
                className="my-2"
                size="lg"
                type="url"
                label="Website"
                placeholder="https://yourwebsite.com"
                status={errors.website ? "error" : undefined}
                fullWidth
                {...register("website", {
                  required: "Website is required",
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                    message: "Please enter a valid website URL",
                  },
                })}
              />
              {errors.website && <div className="text-danger small mt-1">{errors.website.message}</div>}
            </div>

            <div className="mb-3">
              <Input
                rounded
                className="my-2"
                size="lg"
                type="password"
                label="Password"
                placeholder="••••••••"
                status={errors.password ? "error" : undefined}
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  onChange: (e) => checkPasswordStrength(e.target.value),
                })}
              />
              {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}

              {password && (
                <div className="mt-2">
                  <div className="d-flex gap-1" style={{ height: "4px" }}>
                    <div className={`flex-grow-1 rounded ${passwordStrength >= 1 ? "bg-danger" : "bg-light"}`}></div>
                    <div className={`flex-grow-1 rounded ${passwordStrength >= 2 ? "bg-warning" : "bg-light"}`}></div>
                    <div className={`flex-grow-1 rounded ${passwordStrength >= 3 ? "bg-info" : "bg-light"}`}></div>
                    <div className={`flex-grow-1 rounded ${passwordStrength >= 4 ? "bg-success" : "bg-light"}`}></div>
                  </div>
                  <div className="small mt-1 text-muted">
                    {passwordStrength === 0 && "Very weak"}
                    {passwordStrength === 1 && "Weak"}
                    {passwordStrength === 2 && "Fair"}
                    {passwordStrength === 3 && "Good"}
                    {passwordStrength === 4 && "Strong"}
                  </div>
                  <div className="small text-muted mt-1">Password should be at least 6 characters</div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <Input
                rounded
                className="my-2"
                size="lg"
                type="password"
                label="Repeat Password"
                placeholder="••••••••"
                status={errors.repeatPassword ? "error" : undefined}
                fullWidth
                {...register("repeatPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords don't match",
                })}
              />
              {errors.repeatPassword && <div className="text-danger small mt-1">{errors.repeatPassword.message}</div>}
            </div>

            {submissionError && (
              <div className="alert alert-danger" role="alert">
                {submissionError}
              </div>
            )}

            <div className="d-flex flex-column align-items-center">
              <Button rounded size="xl" color="warning" type="submit" disabled={isSubmitting} className="w-100 mb-4">
                {!isSubmitting ? "Sign Up" : <Loading color="currentColor" size="md" />}
              </Button>

              <div className="text-center mt-3">
                <p className="text-muted small">
                  Already have an account?{" "}
                  <a href="/login" className="text-warning fw-medium">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}


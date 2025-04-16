import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import Head from 'next/head';
import { Input, Button, Loading } from "@nextui-org/react"
import { GoogleAnalytics } from '@next/third-parties/google';
import { useTheme } from 'next-themes';


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
  const { theme } = useTheme();
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

    const response = await fetch("/api/submitForm", {
      method: "POST",
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

    if (!response.ok) {
      const resData = await response.json();
      throw new Error(resData.message || 'Failed to submit form');
    }

    setIsSuccess(true);
    reset();

    // Check if the conversion has already been tracked in the session
    const hasTrackedConversion = sessionStorage.getItem("hasTrackedConversion");
    if (!hasTrackedConversion) {
      // Fire conversion event and Enhanced Conversion
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        // Ensure email and phone are available for Enhanced Conversions
        if (!data.email) {
          console.warn("Missing email — Enhanced Conversions may not work properly.");
        }

        // Set user data globally for Enhanced Conversions
        window.gtag("set", "user_data", {
          email: data.email.trim().toLowerCase(),
          phone_number: data.phoneNumber.replace(/\D/g, ''),
        });

        // Fire the conversion event to Google Ads
        window.gtag("event", "conversion", {
          send_to: "AW-16819203227/ubhlCKfY44oaEJvZgtQ-",
          value: 1.0,
          currency: "GBP"
        });

        // Mark the session as having tracked the conversion to avoid duplication
        sessionStorage.setItem("hasTrackedConversion", "true");
      }
    }

    // Enhanced Conversion Logging
    console.log("Enhanced Conversion Data Sent:", {
      email: data.email.trim().toLowerCase(),
      phone_number: data.phoneNumber.replace(/\D/g, ''),
    });

    // Add short delay to ensure gtag has time before redirect
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
  <>
  <Head>
        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Paytriot Payments Sign up"/>

        <title>Sign Up | Paytriot</title>
  </Head>
  <main>
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
            <p> Thank you for signing up! We will reach out to you soon.</p>
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
                  pattern: {
                    value: /^\+\d{1,4}[\s\d\-()]{4,}$/,
                    message: "Please enter a valid phone number with your country code (e.g., +44 123456789)",
                  },
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
                type="text"
                label="Website"
                placeholder="https://yourwebsite.com"
                status={errors.website ? "error" : undefined}
                fullWidth
                {...register("website", {
                  required: "Website is required",
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/\w\-.?=%&]*)*$/,
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
{/*                  <p className="text-muted small">
                   For general queries, please email{" "}
                   <a href="mailto:info@paytriot.co.uk" className="text-warning fw-medium">
                     info@paytriot.co.uk
                   </a>
                 </p> */}
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
   <br />
  </main>
</>
  );
}


// import { Button, Input, Loading, Textarea } from '@nextui-org/react';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// // import { SendIcon } from './SendIcon';

// const ContactForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", `Bearer ${process.env.Bearer_Token}`);

//   const data1 = {
//     "personalizations": [
//       {
//         "to": [
//           {
//             "email": "info@paytriot.co.uk",
//             "name": "Admin"
//           }
//         ],
//         "subject": "New Enquiry for Paytriot Payments"
//       }
//     ],
//     "content": [
//       {
//         "type": "text/plain",
//         "value": `New Customer enquiry from ${register.name}`
//       }
//     ],
//     "from": {
//       "email": "info@paytriot.co.uk",
//       "name": "Paytriot"
//     }
//   };


//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     //console.log(data.name);
//     //console.log(data1.content[0].value);
    

//     let  string = `New customer enquiry from ${data.name}, Please find the contact details

//      Name: ${data.name} ,

//      Email: ${data.email},

//      Phone: ${data.phone},

//      Website: ${data.website.toString()},

//      Subject: ${data.subject},

//      Message: ${data.message} .
     
//      `

//     data1.content[0].value = string;
//     //console.log(data1.content[0].value);

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       if (res.ok) {
//         setSuccess(true);
//         reset();
//         const hasTracked = sessionStorage.getItem('hasTrackedContactConversion');
//         if (!hasTracked && typeof window !== 'undefined' && typeof window.gtag === 'function') {
//           // Fire conversion event
//           window.gtag('event', 'conversion', {
//             send_to: 'AW-16819203227/7Vb7CIuqvMAaEJvZgtQ-',
//             value: 1.50,
//             currency: 'GBP'
//           });
          
//           // Enhanced Conversions (optional but recommended)
//           window.gtag('set', 'user_data', {
//             email: data.email.trim().toLowerCase(),
//             phone_number: data.phone.replace(/\D/g, '')
//           });
          
//           // Mark session as tracked
//           sessionStorage.setItem('hasTrackedContactConversion', 'true');
//         }
//       } else {
//         setError('Oops! Something went wrong.');
//       }
//     } catch (err) {
//       setError('Oops! Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" contact-wrap-custom col-lg-8 d-flex justify-content-center">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Name"
//           {...register('name', { required: true })}
//           status={errors.name ? 'error' : undefined}
//           fullWidth
//         />

//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Email"
//           {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}
//           status={errors.email ? 'error' : undefined}
//           fullWidth
//         />

//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="phone"
//           label="Phone"
//           {...register('phone', { required: true, pattern: /^\+\d{1,5}\d{10}$/ })}
//           status={errors.phone ? 'error' : undefined}
//           fullWidth
//         />

//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Website"
//           {...register('website', { required: true })}
//           status={errors.website ? 'error' : undefined}
//           fullWidth
//         />

//          <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Subject"
//           {...register('subject', { required: true })}
//           status={errors.subject ? 'error' : undefined}
//           fullWidth
//         />

//         <Textarea
//           rows={6}
//           size="lg"
//           className="my-2"
//           label="Message"
//           placeholder="Enter your message here..."
//           fullWidth
//           {...register('message', { required: true })}
//           status={errors?.message ? 'error' : undefined}
//         />
//         <div className="py-4">
//           <Button
//             rounded
//             size="xl"
//             color="warning"
//             type="submit"
//             // iconRight={<SendIcon set="bold" />}
//             disabled={loading}
//           >
//             {!loading ? 'Submit' : <Loading color="currentColor" size="md" />}
//           </Button>

//           {success && (
//             <p style={{ color: 'green' }}>Your message has been sent!</p>
//           )}

//           {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;

"use client"

import { Button, Input, Loading, Textarea } from "@nextui-org/react"
import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formProgress, setFormProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const watchedFields = watch()

  // Calculate form completion progress
  useEffect(() => {
    const fields = ["name", "email", "phone", "website", "subject", "message"]
    const filledFields = fields.filter((field) => watchedFields[field]?.toString().trim())
    const progress = (filledFields.length / fields.length) * 100
    setFormProgress(progress)
    setCurrentStep(filledFields.length)
  }, [watchedFields])

  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", `Bearer ${process.env.Bearer_Token}`)

  const data1 = {
    personalizations: [
      {
        to: [
          {
            email: "info@paytriot.co.uk",
            name: "Admin",
          },
        ],
        subject: "New Enquiry for Paytriot Payments",
      },
    ],
    content: [
      {
        type: "text/plain",
        value: `New Customer enquiry from ${register.name}`,
      },
    ],
    from: {
      email: "info@paytriot.co.uk",
      name: "Paytriot",
    },
  }

  const onSubmit = async (data: any) => {
    setLoading(true)

    const string = `New customer enquiry from ${data.name}, Please find the contact details

     Name: ${data.name} ,

     Email: ${data.email},

     Phone: ${data.phone},

     Website: ${data.website.toString()},

     Subject: ${data.subject},

     Message: ${data.message} .
     
     `

    data1.content[0].value = string

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSuccess(true)
        reset()
        setFormProgress(0)
        setCurrentStep(0)

        const hasTracked = sessionStorage.getItem("hasTrackedContactConversion")
        if (!hasTracked && typeof window !== "undefined" && typeof window.gtag === "function") {
          // Fire conversion event
          window.gtag("event", "conversion", {
            send_to: "AW-16819203227/7Vb7CIuqvMAaEJvZgtQ-",
            value: 1.5,
            currency: "GBP",
          })

          // Enhanced Conversions (optional but recommended)
          window.gtag("set", "user_data", {
            email: data.email.trim().toLowerCase(),
            phone_number: data.phone.replace(/\D/g, ""),
          })

          // Mark session as tracked
          sessionStorage.setItem("hasTrackedContactConversion", "true")
        }

        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError("Oops! Something went wrong.")
      }
    } catch (err) {
      setError("Oops! Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-5">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#d4edda",
          }}
        >
          <i className="fas fa-check-circle fs-1 text-success"></i>
        </div>
        <h3 className="fw-bold mb-3">Message Sent Successfully!</h3>
        <p className="text-muted mb-4">
          Thank you for contacting Paytriot. We've received your message and will get back to you within 24 hours.
        </p>
        <Button
          rounded
          size="lg"
          color="warning"
          onClick={() => setSuccess(false)}
          style={{
            background: "linear-gradient(135deg, #E67E22, #F39C12)",
            border: "none",
          }}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <div className="contact-wrap-custom">
      <style jsx>{`
        .custom-input :global(input),
        .custom-input :global(textarea) {
          border-color: rgb(var(--card-border-rgb)) !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          background-color: rgba(var(--card-rgb), 0.1) !important;
        }
        
        .custom-input :global(input:hover),
        .custom-input :global(textarea:hover) {
          border-color: #E67E22 !important;
          background-color: rgba(255, 255, 255, 0.8) !important;
        }
        
        .custom-input :global(input:focus),
        .custom-input :global(textarea:focus) {
          border-color: #E67E22 !important;
          box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.2) !important;
          background-color: white !important;
        }

        .progress-container {
          background-color: rgba(var(--card-rgb), 0.2);
          border-radius: var(--border-radius);
        }

        .trust-signals {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05));
          border: 1px solid rgba(var(--card-border-rgb), 0.3);
          border-radius: var(--border-radius);
        }

        .completion-card {
          border-radius: var(--border-radius);
          border: 1px solid rgba(230, 126, 34, 0.2);
        }

        .ready-card {
          border-radius: var(--border-radius);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        @media (prefers-color-scheme: dark) {
          .custom-input :global(input),
          .custom-input :global(textarea) {
            background-color: rgba(var(--card-rgb), 0.2) !important;
            color: rgb(var(--foreground-rgb)) !important;
          }
          
          .custom-input :global(input:hover),
          .custom-input :global(textarea:hover) {
            background-color: rgba(var(--card-rgb), 0.3) !important;
          }
          
          .custom-input :global(input:focus),
          .custom-input :global(textarea:focus) {
            background-color: rgba(var(--card-rgb), 0.4) !important;
          }
        }
      `}</style>

      {/* Progress Indicator */}
      {formProgress > 0 && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="small fw-semibold">Completion Progress</span>
            <span className="small fw-semibold" style={{ color: "#E67E22" }}>
              {Math.round(formProgress)}%
            </span>
          </div>
          <div className="progress-container" style={{ height: "8px", overflow: "hidden" }}>
            <div
              style={{
                width: `${formProgress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #E67E22, #F39C12)",
                borderRadius: "var(--border-radius)",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
          <p className="text-muted small mt-1">
            {currentStep < 6 ? `${6 - currentStep} fields remaining` : "Ready to submit!"}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3">
          <div className="col-md-6">
            <Input
              rounded
              className="my-2 custom-input"
              size="lg"
              type="text"
              label="Full Name *"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
              status={errors.name ? "error" : undefined}
              fullWidth
            />
          </div>
          <div className="col-md-6">
            <Input
              rounded
              className="my-2 custom-input"
              size="lg"
              type="email"
              label="Email Address *"
              placeholder="Enter your email address"
              {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}
              status={errors.email ? "error" : undefined}
              fullWidth
            />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <Input
              rounded
              className="my-2 custom-input"
              size="lg"
              type="tel"
              label="Phone Number *"
              placeholder="Enter your phone number"
              {...register("phone", { required: true, pattern: /^\+\d{1,5}\d{10}$/ })}
              status={errors.phone ? "error" : undefined}
              fullWidth
            />
          </div>
          <div className="col-md-6">
            <Input
              rounded
              className="my-2 custom-input"
              size="lg"
              type="text"
              label="Website *"
              placeholder="Enter your website"
              {...register("website", { required: true })}
              status={errors.website ? "error" : undefined}
              fullWidth
            />
          </div>
        </div>

        <Input
          rounded
          className="my-2 custom-input"
          size="lg"
          type="text"
          label="Subject *"
          placeholder="Enter subject"
          {...register("subject", { required: true })}
          status={errors.subject ? "error" : undefined}
          fullWidth
        />

        <Textarea
          rows={6}
          size="lg"
          className="my-2 custom-input"
          label="Message *"
          placeholder="Tell us about your payment processing needs..."
          fullWidth
          {...register("message", { required: true })}
          status={errors?.message ? "error" : undefined}
        />

        {/* Trust Signals */}
        <div className="trust-signals p-3 mb-3">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                  }}
                >
                  <i className="fas fa-shield-alt small text-success"></i>
                </div>
                <span className="small fw-semibold">Your information is secure</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  }}
                >
                  <i className="fas fa-lock small text-primary"></i>
                </div>
                <span className="small fw-semibold">We respect your privacy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <Button
            rounded
            size="xl"
            color="warning"
            type="submit"
            disabled={loading}
            className="w-100 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #E67E22, #F39C12)",
              border: "none",
              height: "56px",
            }}
          >
            {!loading ? (
              <>
                <i className="fas fa-paper-plane me-2"></i>
                Submit
              </>
            ) : (
              <Loading color="currentColor" size="md" />
            )}
          </Button>

          {/* Completion Encouragement */}
          {formProgress > 0 && formProgress < 100 && (
            <div className="completion-card text-center p-3 mt-3" style={{ background: "rgba(230, 126, 34, 0.05)" }}>
              <p className="small fw-semibold mb-0" style={{ color: "#E67E22" }}>
                🎯 You're {Math.round(formProgress)}% complete! Just {6 - currentStep} more field
                {6 - currentStep !== 1 ? "s" : ""} to go.
              </p>
            </div>
          )}

          {formProgress === 100 && (
            <div className="ready-card text-center p-3 mt-3" style={{ background: "rgba(34, 197, 94, 0.05)" }}>
              <p className="small fw-semibold mb-0 text-success d-flex align-items-center justify-content-center">
                <i className="fas fa-check-circle me-2"></i>✨ Perfect! Your form is ready to submit.
              </p>
            </div>
          )}

          {success && (
            <p className="text-success mt-3 fw-semibold">
              <i className="fas fa-check-circle me-2"></i>
              Your message has been sent!
            </p>
          )}

          {error && (
            <p className="text-danger mt-3 fw-semibold">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default ContactForm

